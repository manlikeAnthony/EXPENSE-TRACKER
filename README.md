# Expense Tracker API Documentation

## Overview
The Expense Tracker API enables users to manage their expenses by providing routes for user authentication, expense creation, retrieval, updating, and deletion. The API is built with Node.js and Express.js, ensuring security and scalability.

---

## Base URL
```
https://your-domain.com/api/v1/expenses
```

---

## Authentication
The API uses **JWT (JSON Web Tokens)** for authentication. Include the following header in all requests requiring authentication:

```
Authorization: Bearer <your_token>
```

---

## Endpoints

### 1. User Registration
**URL:** `/auth/register`

**Method:** `POST`

**Description:** Registers a new user in the system.

**Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

**Response:**
- **201 Created**
```json
{
  "success": true,
  "token": "your_jwt_token"
}
```

---

### 2. User Login
**URL:** `/auth/login`

**Method:** `POST`

**Description:** Authenticates an existing user and returns a JWT token.

**Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

**Response:**
- **200 OK**
```json
{
  "success": true,
  "token": "your_jwt_token"
}
```

- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

### 3. Create an Expense
**URL:** `/`

**Method:** `POST`

**Description:** Adds a new expense for the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Body:**
```json
{
  "amount": 50,
  "description": "Grocery shopping",
  "category": "Food"
}
```

**Response:**
- **201 Created**
```json
{
  "success": true,
  "expense": {
    "id": "expenseId",
    "amount": 50,
    "description": "Grocery shopping",
    "category": "Food",
    "createdBy": "userId",
    "createdAt": "2024-12-27T00:00:00.000Z"
  }
}
```

---

### 4. Get All Expenses
**URL:** `/`

**Method:** `GET`

**Description:** Retrieves all expenses associated with the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response:**
- **200 OK**
```json
{
  "success": true,
  "expenses": [
    {
      "id": "expenseId1",
      "amount": 50,
      "description": "Grocery shopping",
      "category": "Food",
      "createdBy": "userId",
      "createdAt": "2024-12-27T00:00:00.000Z"
    },
    {
      "id": "expenseId2",
      "amount": 30,
      "description": "Transportation",
      "category": "Travel",
      "createdBy": "userId",
      "createdAt": "2024-12-27T01:00:00.000Z"
    }
  ]
}
```

---

### 5. Get a Single Expense
**URL:** `/:expenseId`

**Method:** `GET`

**Description:** Retrieves a specific expense by its ID, ensuring it belongs to the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response:**
- **200 OK**
```json
{
  "success": true,
  "expense": {
    "id": "expenseId",
    "amount": 50,
    "description": "Grocery shopping",
    "category": "Food",
    "createdBy": "userId",
    "createdAt": "2024-12-27T00:00:00.000Z"
  }
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Expense not found."
}
```

---

### 6. Update an Expense
**URL:** `/:expenseId`

**Method:** `PATCH`

**Description:** Updates the details of an expense by its ID, ensuring it belongs to the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Body:**
```json
{
  "amount": 60,
  "description": "Updated Grocery shopping",
  "category": "Food"
}
```

**Response:**
- **200 OK**
```json
{
  "success": true,
  "expense": {
    "id": "expenseId",
    "amount": 60,
    "description": "Updated Grocery shopping",
    "category": "Food",
    "createdBy": "userId",
    "updatedAt": "2024-12-27T02:00:00.000Z"
  }
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Expense not found."
}
```

---

### 7. Delete an Expense
**URL:** `/:expenseId`

**Method:** `DELETE`

**Description:** Deletes a specific expense by its ID, ensuring it belongs to the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response:**
- **200 OK**
```json
{
  "success": true,
  "message": "Expense deleted successfully."
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Expense not found."
}
```

---

## Error Handling
The API uses a consistent error response format:

**Example:**
```json
{
  "success": false,
  "message": "Error description here."
}
```

**Common Errors:**
- **401 Unauthorized**: Missing or invalid token.
- **403 Forbidden**: User attempting to access a resource they don't own.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server error.

---

## Technologies Used
- **Node.js**
- **Express.js**
- **Mongoose**
- **JWT for Authentication**
- **MongoDB** as the database

---

## Future Improvements
- Add recurring expenses functionality.
- Implement budget tracking.
- Add analytics for expense trends.
- Introduce export options (CSV, PDF).

---

## Contact
For support or questions about the API, contact:
- **Name**: Anthony
- **Email**: chibuikeonyejesitony@example.com

