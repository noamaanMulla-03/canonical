# Canonical

## Overview

Canonical is a real-time chat platform that allows users to communicate seamlessly. Users can create profiles, update their profiles, and interact with others in a dynamic chat environment. Built with the MERN stack (MongoDB, Express, React, Node.js) with Shadcn for UI, this application showcases modern web development best practices.

---

## Features

-   User authentication (Sign up, Login, Token-based authentication)
-   Profile management (update profile image, first name, last name, etc.)
-   Real-time chat functionality
-   Searching for other users
-   Upload/Download files
-   Responsive design for mobile and desktop devices
-   Backend API for managing users and chat data

---

## Tech Stack

### Frontend

-   **React**: For building the user interface
-   **React Router**: For client-side routing
-   **Shadcn**: For using modern web components
-   **TailwindCSS**: For styling the application

### Backend

-   **Node.js**: JavaScript runtime
-   **Express.js**: For creating RESTful APIs

### Database

-   **MongoDB**: NoSQL database for storing user and chat data
-   **Mongoose**: Node.js library that works with MongoDB to manage and maintain data witch schemas and models.

### Additional Libraries and Tools

-   **Multer**: For file uploads (profile images)
-   **JWT**: For secure authentication
-   **Axios**: For making API requests
-   **Zustand**: For state management
-   **Multer**: For file uploading/deletion

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

-   **Node.js** (v14 or higher)
-   **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)
-   **npm** or **yarn**

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/mern-chat-application.git
    cd mern-chat-application/server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file:

    ```
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_KEY=your_jwt_secret
    CLIENT_URL=http://localhost:5173
    ```

4. Start the server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `client` folder:

    ```bash
    cd ../client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file:

    ```
    VITE_SERVER_URL=http://localhost:5000
    ```

4. Start the development server:
    ```bash
    npm start
    ```

---

## Usage

1. Open the application in your browser at `http://localhost:5173`.
2. Sign up or log in to your account.
3. Update your profile information, including your profile image.
4. Start chatting with other users!

---

## Known Issues

-   Profile image updates occasionally trigger a "controlled to uncontrolled" warning.
-   Conditional rendering for profile images may fail under certain circumstances.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, feel free to contact:

-   **Name**: Noamaan Mulla
-   **Email**: noamaan.mulla03@gmail.com
-   **GitHub**: [noamaanMulla-03](https://github.com/noamaanMulla-03)
