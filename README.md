# Twitter-Demo

This project is a basic implementation of a Twitter-like platform using Node.js, Express, MongoDB, and Mongoose for backend operations. It includes core functionalities such as creating tweets, fetching all tweets, liking, and retweeting tweets, along with user management.

# Project Structure

```bash
Twitter-Demo/
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── tweet.controller.js
│   │   └── user.controller.js
│   ├── error
│   │   ├── error.js
│   │   └── validation.error.js
│   ├── middleWare
│   │   ├── jwt.js
│   │   └── ValidationMiddleware.js
│   ├── models
│   │   ├── Tweet.js
│   │   └── User.js
│   ├── repositories
│   │   ├── tweet.repository.js
│   │   └── user.repository.js
│   ├── routes
│   │   ├── auth.routes.js
│   │   ├── tweet.routes.js
│   │   └── user.routes.js
│   ├── service
│   │   ├── auth.service.js
│   │   ├── tweet.service.js
│   │   └── user.service.js
│   ├── utils
│   │   ├── db.js
│   │   └── encryption.js
│   ├── validation
│   │   ├── auth.validation.js
│   │   └── tweet.validation.js
│   └── views
│       ├── forgetPassword.handlebars
│       ├── welcome.hbs
│       └── welcomeMessage.handlebars
└── vercel.json
```

# Routes and API Documentation

# **User Routes**

1. **POST** /api/users/register
   **Description:** Register a new user.
   Request Body:

   ```json
   {
     "username": "string",
     "email": "string",
     "password": "string",
     "bio": "string (optional)"
   }
   ```

   **Response:**
   . 201 Created: Returns the newly created user details.
   . 400 Bad Request: If the user already exists or invalid data is provided.

2. **POST** /api/users/login
   ** Description:** Log in a user.
   Request Body:

   ```json
   {
     "email": "string",
     "password": "string"
   }
   ```

   **Response:**
   . 201 Created: Returns the newly created user details.
   . 401 Unauthorized: If the credentials are invalid.

3. **GET** /api/users/
   **Description:** Get details of a specific user by ID.
   **Response:**
   . 200 OK: Returns user information (excluding password).
   . 404 Not Found: If the user does not exist.

# **Tweet Routes**

1. **POST** /api/tweets
   ** Description:** Create a new tweet.
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   **Request Body:**

   ```json
   {
     "tweet": "string",
     "media": "string (optional)",
     "profilePicture": "string (optional)",
     "user": "user_id"
   }
   ```

   **Response:**
   . 201 Created: Returns the created tweet.
   . 401 Unauthorized: If the user is not authenticated.

2. **GET** /api/tweets
   **Description:** Get all tweets with pagination.
   **Query Parameters:**
   **limit** (optional, default is 10): Number of tweets to return per page.
   **Response:**
   200 OK: Returns a paginated list of tweets.

# **Requirements**

. Node.js
. MongoDB
. Insomnia or Postman for API testing
. JWT tokens for authenticated routes

# **Possible Outcomes**

. Success responses will generally return a 200 or 201 status code, with the requested data or confirmation message.
. Error responses will return appropriate HTTP status codes:
. 400: Bad Request (Invalid inputs)
. 401: Unauthorized (Invalid or missing token)
. 404: Not Found (Resource does not exist)
. 403: Forbidden (Action not allowed for the user)
