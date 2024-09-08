# AI-Powered Product Review Summarizer

This project demonstrates the use of AI to generate summaries of customer product reviews. It leverages OpenAI's API and the LangChain framework to process review submissions and return concise summaries. The project consists of a backend built with Golang and the langchain-go library, while the frontend is developed using React.js.

### Features:
- **Review Submission**: Users can submit product reviews through the UI.
- **AI Summarization**: By clicking a button, the user can generate a summary of their submitted reviews using OpenAI's API.

### **Tech Stack**:
- Backend: Golang with langchain-go
- Frontend: React.js with Chakra UI

### Prerequisites
To run this project locally, ensure that you have the following installed:
- Golang (>=1.18)
- Node.js (>=14.x.x)
This project uses the OpenAI API, so you will need an OpenAI account to generate an api key.

## Getting Started:
1. Clone the repository:
```bash
git clone https://github.com/garcialuis/langchaingo-demo
cd langchaingo-demo
```

2. Install dependencies:
```bash
make install
```

3. Set your OpenAI API key:
```bash
cp .example.env .env
```
**Important:** Then ensure to populate the **OPENAI_API_KEY** variable from the `.env` file with your own key.

4. Run the project:
```bash
make run
```

5. Making API Requests:
Once the server is running and the UI is up, users can submit product reviews via the UI. Pressing the button with the OpenAI logo will send a request to the server. Ths will trigger a request to the OpenAI API to generate a summary of the reviews. The summary will in turn be displayed in the UI.

### Future Enhancements:
This project was created as a demo for the SOMOS AI workshop.
These are some improvements that can be done for future iterations:
- Add support for more languages.
- Integrate a database for storing reviews.
- Improve the summarization quality by fine-tuning the prompt.
