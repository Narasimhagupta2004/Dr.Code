# E-Commerce Store

A full-stack e-commerce application built with React and Node.js.

## Features

- User authentication with OTP verification
- Product browsing and management
- Shopping cart functionality
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd e-commerce-store
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/verify-otp - Verify OTP
- POST /api/auth/login - Login user

### Products
- GET /api/products - Get all products
- POST /api/products - Create a new product (admin only)
- PUT /api/products/:id - Update a product (admin only)
- DELETE /api/products/:id - Delete a product (admin only)

### Cart
- GET /api/cart - Get user's cart
- POST /api/cart - Add item to cart
- PUT /api/cart/:id - Update cart item quantity
- DELETE /api/cart/:id - Remove item from cart

## Technologies Used

- Frontend:
  - React
  - React Router
  - Axios
  - CSS3

- Backend:
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication
  - Nodemailer (for OTP) 