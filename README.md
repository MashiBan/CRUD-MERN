WhisperTales
WhisperTales is a platform where users can create, view, edit, and delete posts. It features user authentication and a rich text editor for creating and managing content. The project consists of two main components: a React frontend and an Express backend.

Project Structure
client-side/ - React frontend application.
apis/ - Express backend API.
Getting Started
Prerequisites
Node.js (v14 or later)
npm or yarn
Setting Up the Backend (apis)
Navigate to the apis directory:

bash
Copy code
cd apis
Install dependencies:

bash
Copy code
npm install
Create an .env file in the apis directory and add the following environment variables:

env
Copy code
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
Start the server:

bash
Copy code
npm start
The backend server will be running on http://localhost:4000.

Setting Up the Frontend (client-side)
Navigate to the client-side directory:

bash
Copy code
cd client-side
Install dependencies:

bash
Copy code
npm install
Create a .env file in the client-side directory and add the following environment variable:

env
Copy code
REACT_APP_API_URL=http://localhost:4000
Start the development server:

bash
Copy code
npm start