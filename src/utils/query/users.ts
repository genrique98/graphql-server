import { Book_model, User_model, Context, Author_model, Publisher_model } from '../../models/models'
import Client from '../../database'

export const getUsers  = async(parent: User_model, args: User_model, context: Context, info: User_model): Promise<User_model[]> => {
    if (!context.id) throw new Error('you must be logged in');
    
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users;';
        
        const result = await conn.query(sql);

        const user = result.rows

        conn.release();
        return user
    } catch (err) {
        throw new Error(`Could not get users. ${err}`);
    }
}

export const getUser = async(parent: User_model, args: User_model, context: Context, info: User_model): Promise<User_model[]> => {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users WHERE id=($1);';
        
        const result = await conn.query(sql, [args.id]);

        const user = result.rows[0]

        conn.release();
        return user
    } catch (err) {
        throw new Error(`Could not get user. ${err}`);
    }
}