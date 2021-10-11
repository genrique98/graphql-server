import { AuthPayload, Book_model, User_model, Context, Author_model, Publisher_model } from '../../models/models'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Client from '../../database'

export const signup = async(parent: User_model, args: User_model, context: Context, info: User_model): Promise<AuthPayload> => {
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

export const login = async(parent: User_model, args: User_model, context: Context, info: User_model): Promise<AuthPayload> => {
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