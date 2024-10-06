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
│      ├── auth.validation.js
│      └── tweet.validation.js
└── vercel.json
```

# Routes and API Documentation

# **Auth Routes**

1. **POST** /api/v1/auth/signup
   **Description:** Register a new user.
   Request Body:

   ```json
   {
     "username": "string",
     "email": "string",
     "password": "string",
     "bio": "string"
   }
   ```

   **Response:**

   ```json
   {
     "status": "success",
     "error": false,
     "statusCode": 201,
     "data": {
       "username": "",
       "email": "",
       "bio": ""
     }
   }
   ```

   . 201 Created: Returns the newly created user details.
   . 400 Bad Request: If the user already exists or invalid data is provided.

2. **POST** /api/v1/auth/login
   ** Description:** Log in a user.
   Request Body:

   ```json
   {
     "username": "string",
     "password": "string"
   }
   ```

   **Response:**

   ```json
   {
     "status": "success",
     "error": false,
     "statusCode": 200,
     "user": {
       "username": "",
       "id": ""
     },
     "token": ""
   }
   ```

   . 201 Created: Returns the newly created user details.
   . 401 Unauthorized: If the credentials are invalid.

# **User Routes**

1. **GET** /api/v1/user/users
   **Description:** Get details of all user.
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   **Response:**

```json
{
  "status": "success",
  "error": false,
  "statusCode": 200,
  "message": "Users retrieved successfully ",
  "data": [
    {
      "_id": "",
      "username": "",
      "email": "",
      "profilePicture": "",
      "bio": "",
      "__v": 0
    },
    {
      "_id": "",
      "username": "",
      "email": "",
      "profilePicture": "",
      "bio": "....",
      "__v": 0
    }
  ]
}
```

. 200 OK: Returns user information (excluding password).
. 404 Not Found: If the user does not exist.

2. **GET** /api/v1/user/user/:id
   **Description:** Get details of a user by there ID.
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   **Response:**

   ```json
   {
     "status": "success",
     "error": false,
     "statusCode": 200,
     "message": "Users retrieved successfully",
     "data": {
       "_id": "",
       "username": "",
       "email": "",
       "profilePicture": "",
       "bio": "....",
       "__v": 0
     }
   }
   ```

3. **PUT** /api/v1/user/update-user/:id
   **Description:** Update a user details by there ID.
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   Request Body:

   ```json
   {
     "updatedData": ""
   }
   ```

   **Response:**

   ```bash
   {
   status: "success",
   error: false,
   statusCode: "httpStatus.OK",
   message: "User updated successfully",
   data: updatedUser,
   }
   ```

4. **DELETE** /api/v1/user/delete-user/:id
   **Description:** delete a user by there ID.
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   **Response**

   ```bash
   {
    status: "success",
    error: false,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
   }
   ```

5. **POST** /api/v1/user/follow-user
   **Description:** Follow a user .
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   Request Body:

   ```json
   {
     "followerId": "",
     "followeeId": ""
   }
   ```

   **Response:**

   ```json
   {
     "status": "success",
     "error": false,
     "statusCode": 200,
     "message": "You have followed ${followee.username}"
   }
   ```

6. **GET** /api/v1/user/followers/:id
   **Description:** Get a user followers by the ID.
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   **Response:**

   ```json
   {
     "status": "success",
     "error": false,
     "statusCode": 200,
     "message": "Followers for ${followee.username} retrieved successfully",
     "data": []
   }
   ```

7. **GET** /api/v1/user/following/:id
   **Description:** Get a user following by the ID.
   Request Headers:

```json
{
  "Authorization": "Bearer <JWT token>"
}
```

**Response:**

```json
{
  "status": "success",
  "error": false,
  "statusCode": 200,
  "message": "Following for ${followee.username} retrieved successfully",
  "data": []
}
```

8. **POST** /api/v1/user/unfollow-user
   **Description:** Unfollow a user .
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   Request Body:

   ```json
   {
     "followerId": "",
     "followeeId": ""
   }
   ```

   **Response:**

   ```json
   {
     "status": "success",
     "error": false,
     "statusCode": 200,
     "message": "You have unfollowed ${followee.username}"
   }
   ```

# **Tweet Routes**

1. **POST** /api/v1/tweet/create-tweet
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
     "username": "mike",
     "media": "string (optional)",
     "profilePicture": "string (optional)",
     "likes": 70,
     "retweet": 35,
     "views": 13000,
     "user": "user_id"
   }
   ```

   **Response:**

   ```bash
   {
     status: "success",
     error: false,
     statusCode: httpStatus.CREATED,
     data: {
          tweet,
        },
   }
   ```

   . 201 Created: Returns the created tweet.
   . 401 Unauthorized: If the user is not authenticated.

2. **GET** /api/v1/tweet/tweets
   **Description:** Get all tweets .
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   **Response:**

   ```json
   {
    "status": "success",
   "error": false,
   "statusCode": 200,
   "message": "Tweet retrieved successfully ",
   "data": [
   	{
   		"_id": "",
   		"tweet": "",
   		"username": "",
   		"media": "",
   		"profilePicture": "",
   		"likes": ,
   		"retweet": ,
   		"views": ,
   		"user": "",
   		"__v": 0
   	},
   	{
   		"_id": "",
   		"tweet": "",
   		"username": "",
   		"media": "",
   		"profilePicture": "",
   		"likes": ,
   		"retweet": ,
   		"views": ,
   		"user": "",
   		"__v": 0
   	},
   ]
   }
   ```

   200 OK: Returns a paginated list of tweets.

3. **DELETE** /api/v1/tweet/delete-tweet/:id
   **Description:** Delete tweet based on the id .
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   **Response:**

   ```bash
   {
    status: "success",
    error: false,
    statusCode: httpStatus.OK,
    message: "Tweet deleted successfully",
   }
   ```

4. **GET** /api/v1/tweet/tweet/:id
   **Description:** Get a single tweet based on the id .
   Request Headers:

   ```json
   {
     "Authorization": "Bearer <JWT token>"
   }
   ```

   **Response:**

   ```bash
   {
   status: "success",
   error: false,
   statusCode: httpStatus.OK,
   message: "Tweet retrieved successfully",
   data: tweet,
   }
   ```

5. **GET** /api/v1/tweet/tweets/:id
   **Description:** Get all the tweet based on the userid .
   Request Headers:

```json
{
  "Authorization": "Bearer <JWT token>"
}
```

    **Response:**

```bash
{
status: "success",
error: false,
statusCode: httpStatus.OK,
message: "Tweet retrieved successfully",
data: tweet,
}
```

# **Requirements**

1. Node.js
2. MongoDB
3. Insomnia or Postman for API testing
4. JWT tokens for authenticated routes

# **Possible Outcomes**

1. Success responses will generally return a 200 or 201 status code, with the requested data or confirmation message.
   . Error responses will return appropriate HTTP status codes:
1. 400: Bad Request (Invalid inputs)
1. 401: Unauthorized (Invalid or missing token)
1. 404: Not Found (Resource does not exist)
1. 403: Forbidden (Action not allowed for the user)
