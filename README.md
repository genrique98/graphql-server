# Grapqhql 
Apollo-Express Graphql server 

## Features
- PostgreSQL migrations with db-migrate
- Authorization JWT
- Password encryption with Bcrypt
- Caching / Batching with Graphql Dataloader


## Set Up
Add a .env file with the following variables:
```
POSTGRES_HOST=postgres
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=graphql
ENV=dev
BCRYPT_PASSWORD=(your_password)
SALT_ROUNDS=10
TOKEN_SECRET=(your_token)
```
run: `psql` and `CREATE DATABASE graphql;`

run: `npm install`, `npm run migrate`, and `npm run watch`, then navigate to `http://localhost:4000/graphql`

## Queries
- info: String!
- feed: [Book!]!
- book(id: ID): Book
- users: [User]

## Mutations
- signup(email: String!, password: String!, name: String!, username: String!): AuthPayload
- login(email: String!, password: String!): AuthPayload
- addBook(title: String!, author: String!, category: String!): Book!
- updateBook(id: ID!, url: String, description: String): Book!
<!-- - deleteBook(id: ID!): Book -->

Signup / login is required before using queries or mutations. Use token in HTTP header:

{
  "Authorization": "Bearer (your_token)"
}
