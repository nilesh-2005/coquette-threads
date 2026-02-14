# API Reference

Base URL: `/api`

## Authentication

### Login
- **POST** `/auth/login`
- Body: `{ email, password }`
- Response: `{ token, user }`

### Register (Admin)
- **POST** `/auth/register`
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, email, password }`

## Products

### Get All Products
- **GET** `/products`
- Query Params: `?keyword=...`, `?pageNumber=...`, `?category=...`

### Get Single Product
- **GET** `/products/:id`
- **GET** `/products/slug/:slug`

### Create Product (Admin)
- **POST** `/products`
- Headers: `Authorization: Bearer <token>`
- Body: Product Object

### Update Product (Admin)
- **PUT** `/products/:id`
- Headers: `Authorization: Bearer <token>`

### Delete Product (Admin)
- **DELETE** `/products/:id`
- Headers: `Authorization: Bearer <token>`
