# Library Management System

## Overview

This project is a Library Management System built using Node.js, Express, MongoDB, and other technologies. It includes features such as book borrowing, returning, and library management.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Localization](#localization)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/karthik-A-22/book-keeping-service.git
   cd book-keeping-service
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a new file named `.env` in the root directory and add the following environment variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/book-keeping
   JWT_SECRET=your_jwt_secret_key
   FIREBASE_SERVICE_ACCOUNT_KEY=path_to_your_firebase_service_account_key.json
   ```

## Configuration

1. **Localization**
   Place your translation JSON files in the locales directory:

   ```
   locales/
   ├── en
   │   └── translation.json
   └── hi
   │   └── translation.json
   ```

2. **Firebase Configuration**
   Place your Firebase service account key in the root directory:
   ```
   secure/
   └── firebase-service-account-key.json
   ```

## Running the Application

1. **Start MongoDB**
   Ensure MongoDB is running locally or use a remote MongoDB service.

2. **Start the Server**
   Run the following command in your terminal:
   ```
   npm start
   ```

This will start the server on port 5000.
By default, the server will run on http://localhost:5000.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

Feel free to customize the details such as repository URL, environment variable names, and any specific instructions related to your setup.
