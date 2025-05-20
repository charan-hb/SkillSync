# ShareIt - College Collaboration Platform

ShareIt is a full-stack web application designed to help college students connect, exchange skills, and form teams for hackathons or academic projects.

## Features

- Student registration and login system with JWT authentication
- Student profiles with skills and interests
- Two types of posts:
  - Looking for teammates
  - Offering help
- Skill/tag-based search and filters
- Real-time chat system
- Admin dashboard for content moderation
- Responsive and modern UI

## Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- Real-time Communication: Socket.io

## Project Structure

```
shareit/
├── frontend/           # React frontend application
├── backend/            # Node.js backend application
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Documentation

The API documentation will be available at `http://localhost:5000/api-docs` once the backend server is running.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 
##sample 
![Screenshot 2025-05-20 123000](https://github.com/user-attachments/assets/362a1a4e-8f1a-4d5f-9177-60b62560e6ef)
![Screenshot 2025-05-20 122837](https://github.com/user-attachments/assets/47d47e5c-3e78-4fbf-ab1b-a2f4e63fa301)
![Screenshot 2025-05-20 122905](https://github.com/user-attachments/assets/6e7d5a39-8cd0-43d0-82eb-ede21bba7145)
![Screenshot 2025-05-20 172711](https://github.com/user-attachments/assets/3e933652-07de-4a89-8f6a-dfe47073630a)



