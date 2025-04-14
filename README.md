# Craftdle Frontend

## Description

The **Craftdle frontend** is a web-based application designed to provide an interactive and engaging user experience for the game. It is responsive and optimized for different devices, enabling players to enjoy the game seamlessly. The frontend communicates with the backend using **API calls** and **WebSockets** for real-time gameplay.

## Technologies

- **React.js** – Frontend framework
- **Vite** – Fast build tool
- **Redux** – State management
- **Socket.io-client** – Real-time communication

## Installation & Running

### 1. Obtain the `.env` File
Request the `.env` file from an existing developer. This file contains necessary environment variables for the application to work properly.

### 2. Install Dependencies

Run the following command to install all the required dependencies:

```sh
npm install
```

### 3. Start the Application

- **Development Mode**:  
  To start the application in development mode, run:

  ```sh
  npm run dev
  ```

- **Production Mode**:  
  To start the application in production mode, first build the application:

  ```sh
  npm run build
  ```

  Then, start the application:

  ```sh
  npm run start:prod
  ```

This will run the app on the following local addresses:

- **Normal Preview Version**: [http://localhost:4173/](http://localhost:4173/)
- **Test Preview Version**: [http://test.localhost:4173/](http://test.localhost:4173/)
- **Normal Dev Version**: [http://localhost:5173/](http://localhost:5173/)
- **Test Dev Version**: [http://test.localhost:5173/](http://test.localhost:5173/)

### 4. Additional Scripts

The following scripts are available for other tasks:

- **Build the application**:  
  ```sh
  npm run build
  ```

- **Lint the codebase**:  
  ```sh
  npm run lint
  ```

- **Run tests**:  
  ```sh
  npm run test
  ```

- **Generate documentation using TypeDoc**:  
  ```sh
  npm run docs
  ```
  This will generate API documentation for the TypeScript codebase and place it in the `./docs` directory.

### 5. Windows Specific Configuration (Optional)

If you're on **Windows** and want to access the **Test version** (e.g., `test.localhost`), you'll need to update your `hosts` file to map `test.localhost` to `127.0.0.1`.

1. Open `C:\Windows\System32\drivers\etc\hosts` file as **Administrator**.
2. Add the following line to the end of the file:

   ```
   127.0.0.1 test.localhost
   ```

This will allow you to access the **Test version** at [http://test.localhost:4173/](http://test.localhost:4173/) and [http://test.localhost:5173/](http://test.localhost:5173/).

---

## Environment Variables

The application requires the following environment variables to be set in the `.env` file:

- **`VITE_SERVER_URL`** – Base URL of the backend server.

Ensure the `.env` file is obtained from an existing developer and placed in the root of the project.

---

### Tips

- If you encounter issues with accessing the local or test version, double-check the `hosts` file and restart your development server.
- Make sure that your backend server is running and accessible for real-time communication.