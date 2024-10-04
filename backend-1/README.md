# Node.js E-Commerce API 

This full E-Commerce API build using Express and Mongo. Here it contains all the required functionalities of a full-fledged E-commerce API like User registration, User Login, Category Add, Edit & Delete, Product Add, Edit, Delete, Add product feature image & Add product images, Order creation and etc...


## Setup
  $ cd backend-1
	$ npm install    
  $nom install mongoose express
  $ npm i @stripe/stripe-js
  ### Run The Service
  ```
  $ nodemon app.js
  ```
## API Endpoints

## User Routes
### * Create User
`POST |  /api/v1/users/register` 
### * Login User
`POST |  /api/v1/users/login` 

## Product Routes
### *Getting products
 `GET | /products/${id}`
### *Loading products
 `GET|/products`


### Orders
### *Clear cart
`POST | /orders/delete/cart/all`;
### *Add product to cart
`POST |/orders/cart`;
### * removal of products from cart
`POST | /orders/deletecart/${productId}`
### *loading cart products
`POST | /orders/get/cart`
### *plaing order
`POST |/orders/finalorder`
### *Order history
`POST | /orders/get/usersorders/history`
### * Stripe payment 
`POST | /create-checkout-session`

