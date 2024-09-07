package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/tmc/langchaingo/llms/openai"
)

type Review struct {
	ID   int    `json:"_id,omitempty"`
	Body string `json:"body"`
}
type Summary struct {
	Body string `json:"body"`
}

var reviews map[int]Review = map[int]Review{}
var aggCount int

func main() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	router := gin.Default()

	//CORS config:
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
	}))

	v1 := router.Group("/api/v1")
	{
		v1.GET("/reviews", getReviews)
		v1.GET("/summaries", generateSummary)
		v1.POST("/reviews", submitReview)
		v1.DELETE("/reviews/:id", deleteReview)
	}

	router.Run(":8080")
}

func getReviews(c *gin.Context) {

	c.JSON(200, reviews)
}

func generateSummary(c *gin.Context) {

	var summary Summary
	if len(reviews) == 0 {
		c.JSON(200, summary)
	}

	llm, err := openai.New()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	var sb strings.Builder

	for _, review := range reviews {
		sb.WriteString(review.Body)
		sb.WriteString("\n\n")
	}

	requestPrompt := fmt.Sprintf("Summarize the following reviews, make sure to highlight the pros and cons mentioned by customers: \n\n%s", sb.String())

	completion, err := llm.Call(context.Background(), requestPrompt)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	summary.Body = completion

	c.JSON(200, summary)
}

func submitReview(c *gin.Context) {

	var newReview Review

	if err := c.BindJSON(&newReview); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON"})
		return
	}

	if len(newReview.Body) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No review was given"})
		return
	}

	aggCount++
	newReview.ID = aggCount

	reviews[aggCount] = newReview

	c.JSON(200, reviews)
}

func deleteReview(c *gin.Context) {

	id := c.Param("id")

	if len(id) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Review ID is missing"})
		return
	}

	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID was given"})
		return
	}

	delete(reviews, ID)

	c.JSON(http.StatusOK, nil)
}
