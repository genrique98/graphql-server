/* Replace with your SQL commands */

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(150) NOT NULL,
    category VARCHAR(150) NOT NULL
);