
# InterviewGPT Chatbot

Welcome to InterviewGPT Chatbot! This project utilizes OpenAI's GPT-3.5 Turbo to simulate an interview conversation.

## Setup

### Prerequisites

- Node.js and npm installed
- Firebase project created
- OpenAI API Key access 

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/archie-arya/interview-gpt.git
   ```

2. Change into the project directory:

   ```bash
   cd interview-gpt
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up Firebase:

   - Create a Firebase project: [Firebase Console](https://console.firebase.google.com/)
   - Copy your Firebase configuration from the project settings.
   - Replace the placeholder configuration in `src/firebase.js` with your Firebase configuration.
   - Inside `src/firebase` add the following code in the end
     ```bash
         export const saveUserResponse = async (name, area, interviewType, difficultyLevel) => {
          try {
            // Reference the 'userResponses' collection
            const responsesCollection = collection(db, 'userResponses');
        
            // Create an object with user response data
            const userResponseData = {
              name,
              area,
              interviewType,
              difficultyLevel,
              timestamp: Timestamp.fromDate(new Date()),
            };
        
            // Add a new document with an auto-generated ID to the 'userResponses' collection
            await addDoc(responsesCollection, userResponseData);
        
          } catch (error) {
            console.error('Error saving user response:', error);
          }
      };
     ```

5. Create an OpenAI API key:

   - Obtain your OpenAI API key from the OpenAI platform.
   - Replace the placeholder API key in `src/openapi.js` with your OpenAI API key.

6. Run the app:

   ```bash
   npm start
   ```

   The app should be accessible at `http://localhost:3000`.

## Usage

1. Visit the app in your web browser.

2. Enter your name, area, interview type, and difficulty level.

3. Start the interview conversation with the AI.

4. The AI will ask questions, listen to your answers, and respond accordingly.

## Deployment

To deploy the app to Firebase Hosting:

```bash
firebase login  # Log in to your Firebase account (if not logged in)
firebase init   # Initialize Firebase project (select Hosting and follow the prompts)
firebase deploy # Deploy the app to Firebase Hosting
```

Your app will be live at the provided Firebase Hosting URL.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
