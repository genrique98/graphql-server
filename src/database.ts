import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const { Pool } = pg;

const { 
    POSTGRES_HOST, 
    POSTGRES_DB, 
    POSTGRES_TEST_DB, 
    POSTGRES_USER, 
    POSTGRES_PASSWORD,
    ENV 
} = process.env;

const config = {
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
}

const Client = new Pool(config);

export default Client