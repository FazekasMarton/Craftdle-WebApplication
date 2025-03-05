# Craftdle Frontend

## Description

The Craftdle frontend is a web-based application that provides an interactive and engaging user experience for the game. It is designed to be responsive, allowing players to enjoy the game on any device. The frontend communicates with the backend via API calls and WebSockets for real-time gameplay.

## Technologies

- **React.js** – Frontend framework
- **Vite** – Fast build tool
- **Redux** – State management
- **Socket.io-client** – Real-time communication

## Installation & Running

1. **Obtain the .env file** – Request it from an existing developer.
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start in development mode:**
   ```sh
   npm run dev
   ```

## Environment Variables

The application requires the following environment variables to be set in a `.env` file:

- `VITE_SERVER_URL` – Base URL of the backend server

A `.env` file should be obtained from an existing developer.