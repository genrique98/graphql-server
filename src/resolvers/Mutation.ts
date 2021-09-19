import Client from '../database'
import bcrypt from 'bcrypt'
import { AuthPayload, Book, User, Context } from '../models/models'
import jwt, { Secret } from 'jsonwebtoken'

export const signup = async(parent: User, args: User, context: Context, info: User): Promise<AuthPayload> => {
    try {
        const conn = await Client.connect();
        const sql = 'INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
        
        const hash = await bcrypt.hashSync(
            args.password + BCRYPT_PASSWORD,
            parseInt((SALT_ROUNDS as unknown) as string) 
        )
        const sqlargs = [args.name, args.email, args.username, hash];
        
        await conn.query(sql, sqlargs);
        
        const token = jwt.sign({ id: args.id }, TOKEN_SECRET as Secret)
        
        const payload: AuthPayload = { token: token, user: args }

        conn.release();

        return payload
    } catch (err) {
        throw new Error(`Could not add user ${args.name}. ${err}`);
    }
}

export const login = async(parent: User, args: User, context: Context, info: User): Promise<AuthPayload> => {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users WHERE email=($1)';
        const result = await conn.query(sql, [args.email]);

        const { BCRYPT_PASSWORD, TOKEN_SECRET } = process.env;

        conn.release();

        if (result.rows.length) {
            const user = result.rows[0]
            const verified = await bcrypt.compareSync(args.password + BCRYPT_PASSWORD, user.password)

            if (verified) {
                console.log('user is verified')
                const token = jwt.sign({ id: user.id }, TOKEN_SECRET as Secret)

                const payload: AuthPayload = { token: token, user: user }

                return payload
            } else {
                console.log('bcrypt error')
                throw new Error('Invalid password')
            }
        } else {
            throw new Error('No such user found')
        }
        
    } catch (err) {
        throw new Error(`Could not authenticate user ${args.email}. ${err}`);
    }
}

export const addBook = async(parent: Book, args: Book, context: Context, info: Book): Promise<Book> => {

    if (!context.id) throw new Error('you must be logged in');

    try {

        const { id } = context; // 

        const conn = await Client.connect();
        const sql = 'INSERT INTO books (title, author, category) VALUES ($1, $2, $3) RETURNING *';

        const sqlargs = [args.title, args.author, args.category];
        
        await conn.query(sql, sqlargs);

        conn.release();

        const book = {
            id: id,
            title: args.title,
            author: args.author,
            category: args.category
        }

        return book;
    } catch (err) {
        throw new Error(`Could not add book ${args.title}. ${err}`);
    }
}
