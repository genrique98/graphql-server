import { Book, User, Context } from '../models/models'
import Client from '../database'

export function info(): string {
    return `This is a description`;
}

export function feed(parent:Book, args:Book, context: Context, info:Book) {
    // return context.prisma.link.findMany()
}

export function book(args:Book) {

}

export const users = async(parent: User, args: User, context: Context, info: User): Promise<User[]> => {
    if (!context.id) throw new Error('you must be logged in');
    
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users;';
        
        const result = await conn.query(sql);

        const user = result.rows

        conn.release();
        return user
    } catch (err) {
        throw new Error(`Could not add user. ${err}`);
    }
}