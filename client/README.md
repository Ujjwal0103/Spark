# E-Commerce Web Application

A full-stack e-commerce application built with React.js and Node.js, featuring user authentication, product management, and shopping cart functionality.

## Features

- User Authentication (Login/Register)
- Product Listing and Management
- Shopping Cart
- Admin Dashboard
- Image Upload with Cloudinary
- Responsive Design

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Context API for State Management

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for Image Storage

## Project Structure

├── client/ # Frontend React application
│ ├── public/ # Static files
│ └── src/
│ ├── api/ # API integration
│ ├── components/ # React components
│ └── GlobalState.js # Global state management
└── server/ # Backend Node.js application
├── controllers/ # Request handlers
├── middleware/ # Custom middleware
├── models/ # Database models
└── routes/ # API routes

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with:

```
MONGODB_URL=your_mongodb_url
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Application

1. Start the server:

```bash
cd server
npm run dev
```

2. Start the client:

```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- POST `/user/register` - Register new user
- POST `/user/login` - User login
- GET `/user/logout` - User logout
- GET `/user/refresh_token` - Refresh authentication token

### Products

- GET `/api/products` - Get all products
- POST `/api/products` - Create new product (Admin only)
- DELETE `/api/products/:id` - Delete product (Admin only)
- PUT `/api/products/:id` - Update product (Admin only)

### Categories

- GET `/api/category` - Get all categories
- POST `/api/category` - Create category (Admin only)
- DELETE `/api/category/:id` - Delete category (Admin only)
- PUT `/api/category/:id` - Update category (Admin only)

## Security Features

- Password Hashing with Bcrypt
- JWT Authentication
- HTTP-Only Cookies
- Protected Routes
- Admin Authorization

## License

This project is licensed under the MIT License.
