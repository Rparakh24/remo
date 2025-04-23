# README Generator

Users can sign up, sign in, and then submit a GitHub URL. The application uses the Google Gemini API to process the repository's TypeScript files and generate a README.md file.

## Project Description

The README Generator simplifies the process of creating professional README files for your GitHub projects. By leveraging Google Gemini's powerful AI capabilities, it analyzes your project's codebase and generates comprehensive and well-formatted README content, including project descriptions, installation steps, and usage examples.

## Installation Steps

### Backend
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `backend` directory and add the following environment variables:
```
JWT_SECRET=<your_jwt_secret_key>
GEMINI_API_KEY=<your_gemini_api_key>
```
4. Run database migrations (if you are using Prisma): `npx prisma migrate dev`

### Frontend
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`


## API Routes and Dummy JSON Responses

**Backend Routes:**

* **POST /user/signup**
    * Request:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "apiKey": "YOUR_API_KEY"
    }
    ```
    * Response (Success - 200):
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
    }
    ```
    * Response (Error - 403):
    ```json
    {
        "msg": "User already exist" 
    }
    ```

* **POST /user/signin**
    * Request:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
    * Response (Success - 200):
    ```json
    {
      "msg": "Signin Success",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
    * Response (Error - 401):
    ```json
    {
        "msg": "User does not exist"
    }
    ```


* **POST /user/readme**
    * Request (Requires Authorization header with JWT):
    ```json
    {
      "url": "https://github.com/username/repo.git"
    }
    ```
    * Response (Success - 200):
    ```json
    {
      "msg": "Readme generated",
      "readme": "# Project Title\n\nThis is the generated README content..."
    }
    ```
    * Response (Error - 500):
    ```json
    {
        "msg": "Error in generating readme"
    }
    ```


## Run Locally

### Backend

1.  Start the backend server: `npm i ts-node ts-node index.ts` (Make sure you are in the `backend` directory)

### Frontend

1. Start the frontend development server: `npm run dev` (Make sure you are in the `frontend` directory)


This will start the frontend application on `http://localhost:5173` (or a similar port specified by Vite). You can then access the application in your browser.  You should be able to sign up/sign in and then submit a GitHub repository URL to generate a README file.


This enhanced README provides more comprehensive documentation, particularly with formatted dummy JSON responses for the API routes, and the `Run Locally` instructions. It also improves the organization and readability of the installation steps, separates frontend and backend steps, and includes error responses to provide a better understanding of the project.
