# NeoByte [e-commerce website]

An advanced e-commerce platform built with a modern tech stack, featuring user authentication, product management, order processing, and payment integration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Key Functionalities](#key-functionalities)
- [Scripts](#scripts)
- [Future Enhancements](#future-enhancements)

---

## Features

- **User Authentication**: Secure login, registration, and logout functionality with JWT.
- **Admin Dashboard**: Manage users, products, and orders.
- **Product Management**: Add, update, delete, and filter products.
- **Shopping Cart**: Add items to the cart, update quantities, and proceed to checkout.
- **Order Management**: Place orders, view order history, and track delivery status.
- **Payment Integration**: Integrated payment gateway (e.g., SSLCommerz).
- **Responsive Design**: Fully responsive UI for all devices.

### Video Demo

YouTube Video Link: [NeoByte YT Demo Video](https://youtu.be/-2il4feo3XI?si=PRrNFjeo-aGrNxtL)

### Screenshots

#### Home Page

![Home Page](<Home Page.png>)

![](<Top Products on homepage.png>)

#### Shop Page

![Shop Page](<Shop Page.png>)

![Shop Page Filtered product](<Filtering products.png>)

#### Product Details Page

![Review](<Product Customer Product Review.png>)

![Product Details Page](<Product Details Page.png>)

![related product](<Related Products.png>)

#### Favourite Products Page

![fav product](<Favourites Page.png>)

#### Login Page

![login](<Login Page.png>)

#### Registration Page

![registration](<User Registration Page.png>)

#### User Navigation Links (After Login)

![user links](<User Navigations.png>)

#### User Profile Page

![profile](<User Profile Page.png>)

#### User Orders Page

![user orders](<User Orders Page.png>)

#### Admin Pages

![Admin links](<Admin Pages.png>)

#### Admin Dashboard

![dashboard](<Admin Dashboard.png>)

![orders](<Order List on dashboard.png>)

#### Admin Add Product Page

![new product](<Add Product form.png>)

#### Admin All Products Page

![Admin All Products Page](<Admin All Products Page.png>)

#### Admin Manage Categories Page

![catagory](<Manage Category Form .png>)

#### Admin Oder List Page

![order list](<Order List Page.png>)

#### Admin User List Page

![user list](<User List Page.png>)

#### Shopping Cart Page

![cart](<Shopping Cart Page.png>)

#### Order Shipping Address Form

![shipping info](<Shipping info form.png>)

#### Order Review before payment

![order review](<Order Review Page.png>)

#### Payment Section

![payment](<Payment Section.png>)

![confirmation](<Payment Confirmation.png>)

---

## Tech Stack

### Frontend:

- React.js (with Vite)
- Redux Toolkit for state management
- TailwindCSS for styling
- React Router for navigation

### Backend:

- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt.js for password hashing

### Other Tools:

- Formidable for file uploads
- SSLCommerz for payment processing
- Concurrently for running frontend and backend together

---

## Setup Instructions

### Prerequisites:

- Node.js and npm installed
- MongoDB installed and running locally or on a cloud service
- SSLCommerz credentials (for payment integration)

### Steps:

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd E-Commerce-Project
    ```

2.  Install Dependencies

    ```bash
    npm i
    cd forntend
    npm i
    ```

3.  Create .env file and define your environment variables

    ```
    PORT = <local port>
    MONGO_URI = <your db uri>
    JWT_SECRET = <your jwt secret>
    NODE_ENV = <your develop key>
    STORE_ID = <sslcmz store id>
    STORE_PASSWORD = <sslcmz store password>
    ```

4.  Run Code [only backend]

    ```bash
    npm run backend
    ```

5.  Run Code [project]

    ```bash
    npm run dev
    ```

---

# Thanks for reading 😊.
