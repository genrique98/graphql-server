import { Book_model, User_model, Context, Author_model, Publisher_model } from '../../models/models'
import Client from '../../database'

export const getBook = async(parent: Book_model, args: User_model, context: Context, info: User_model): Promise<Book_model[]> => {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM books WHERE id=($1)';
        const result = await conn.query(sql, [args.id]);
        const book = result.rows

        conn.release();
        return book[0]
    } catch (err) {
        throw new Error(`Could not get book. ${err}`);
    }
}
export const getBooks = async(parent: Book_model, args: Book_model, context: Context, info: Book_model): Promise<Book_model[]> => {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM books;';
        
        const result = await conn.query(sql);

        const books = result.rows

        conn.release();
        return books
    } catch (err) {
        throw new Error(`Could not get books. ${err}`);
    }
}