# Dengue Guidance Chatbot

A chatbot designed to provide information and guidance on Dengue prevention, symptoms, treatment, and general advice. The chatbot is built using the Mistral-7B-Instruct model, customized specifically for answering queries related to Dengue.

## Features

- **Dengue-Specific Guidance**: The chatbot is fine-tuned to answer all questions related to Dengue.
- **System Restrictions**: It will only provide guidance related to Dengue and will respond with an apology if asked anything unrelated.
- **Creator's Response**: If asked about the creator or developer, it will respond with the developer's name.
- **API-Driven**: Utilizes the `Mistral-7B-Instruct` model for generating chatbot responses.

## Technologies Used

- **Backend**: Node.js with `server.js` for API handling
- **Frontend**: HTML, CSS (modern and interactive chat interface)
- **Model**: Mistral-7B-Instruct from LM Studio for the chatbot API
- **API**: REST API for chat completions with cURL integration
- **Design**: Clean, user-friendly UI inspired by popular chatbot designs (similar to ChatGPT)

## How It Works

1. **User Input**: The user enters a query or message into the input field.
2. **API Call**: A request is made to the backend API, which connects to the LM Studio, specifically the Dengue Guidance Chatbot model.
3. **Model Response**: The Mistral-7B-Instruct model generates a response based on the user's query.
4. **Frontend Display**: The generated response is displayed in the frontend chat window.
5. **System Restrictions**: The system ensures that only Dengue-related queries are answered. If the question is unrelated, it responds with "I am sorry, I am only customized for giving guidance and advice about Dengue."
6. **Developer Query**: If asked about its creator, it responds with "I am a Dengue guidance chatbot developed by Md. Ashikul Islam."

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dengue-guidance-chatbot.git
