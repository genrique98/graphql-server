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
POSTGRES_DB=(your_db_name)
ENV=dev
BCRYPT_PASSWORD=(your_password)
SALT_ROUNDS=10
TOKEN_SECRET=(your_token)
```
run: `psql` and `CREATE DATABASE (your_db_name);`

run: `npm install`, `npm run migrate`, and `npm run start`, then navigate to `http://localhost:4000/graphql`

## Schema
```
type User {
  id: ID!
  name: String!
  email: String!
  username: String!
  password: String!
}

type Book {
  id: ID!
  title: String!
  category: String!
  author: Author!
  publisher: Publisher!
}

type Author {
  id: ID!
  name: String!
  lastName: String!
  bio: String!
}

type Publisher {
  id: ID!
  name: String!
}

type AuthPayload {
  token: String
  user: User
}
```

## Queries
- users: [User]!
- user(id: ID!)
- books: [Book!]!
- book(id: ID!): Book!
- authors: [Author!]!
- author(id: ID!): Author!
- publishers: [Publisher!]!
- publisher(id: ID!): Publisher!


## Mutations
- signup(email: String!, password: String!, name: String!, username: String!): AuthPayload
- login(email: String!, password: String!): AuthPayload
- addBook(title: String!, author: String!, category: String!): Book!
- addAuthor(name: String!, lastName: String!, bio: String!): Author!
- addPublisher(name: String!): Publisher!

Signup / login is required before using queries or mutations. Use token in HTTP header:

```
{
  "Authorization": "Bearer (your_token)"
}
```