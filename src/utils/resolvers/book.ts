import { Book_model, Context, Author_model, Publisher_model } from '../../models/models'
import Client from '../../database'

export const author = async(parent: Book_model, args: Author_model, context: Context, info: Author_model): Promise<Author_model[]> => {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM authors WHERE id=($1);';
        
        const result = await conn.query(sql, [parent.author_id]);

        const author = result.rows[0]

        conn.release();
        return author
    } catch (err) {
        throw new Error(`Could not get author. ${err}`);
    }
}
export const publisher = async(parent: Book_model, args: Publisher_model, context: Context, info: Publisher_model): Promise<Publisher_model[]> => {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM publishers WHERE id=($1);';
        
        const result = await conn.query(sql, [parent.publisher_id]);

        const publisher = result.rows[0]

        conn.release();
        return publisher
    } catch (err) {
        throw new Error(`Could not get publisher. ${err}`);
    }
}
