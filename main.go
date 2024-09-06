package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/tmc/langchaingo/llms/openai"
)

func main() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	router := gin.Default()

	v1 := router.Group("/api/v1")
	{
		v1.POST("/generate", generateCompletion)
	}

	router.Run(":8080")
}

func generateCompletion(c *gin.Context) {

	var requestData struct {
		Prompt string `json:"prompt"`
	}
	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON"})
		return
	}

	llm, err := openai.New()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	if len(requestData.Prompt) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No prompt was given"})
		return
	}

	reviews := []string{}

	var sb strings.Builder

	for _, review := range reviews {
		sb.WriteString(review)
		sb.WriteString("\n\n")
	}

	requestPrompt := fmt.Sprintf("Summarize the following reviews, make sure to highlight the pros and cons mentioned by customers: \n\n%s", sb.String())

	completion, err := llm.Call(context.Background(), requestPrompt) //requestData.Prompt
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"completion": completion})
}
