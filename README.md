# UbuCon Asia 2025 Poster Generator

This project is a web application that allows participants of UbuCon Asia 2025 to generate a personalized event promotion banner.

## Features

- Upload a profile photo with automatic background removal.
- Add your name and organization/title.
- Download the final poster in PNG format.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Image Processing:** Sharp
- **Background Removal:** remove.bg API

## Getting Started

### Prerequisites

- Node.js and npm installed.
- A remove.bg API key.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ubucon-aisa-poster.git
   cd ubucon-aisa-poster
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../backend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory.
2. Add your remove.bg API key to the `.env` file:
   ```
   REMOVE_BG_API_KEY=YOUR_API_KEY_HERE
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server:**
   ```bash
   cd ../frontend
   npm start
   ```

The application will be available at `http://localhost:3000`.
