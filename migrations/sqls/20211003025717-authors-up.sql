/* Replace with your SQL commands */

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    bio VARCHAR(250) NOT NULL
);