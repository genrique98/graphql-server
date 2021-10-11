import { Context, Author_model } from '../../models/models'
import Client from '../../database'

export const getAuthor = async(parent: Author_model, args: Author_model, context: Context, info: Author_model): Promise<Author_model[]> => {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM authors WHERE id=($1);';
        
        const result = await conn.query(sql, [args.id]);
        // const result = await conn.query(sql, [parent.author_id]);

        const author = result.rows[0]

        conn.release();
        return author
    } catch (err) {
        throw new Error(`Could not get author. ${err}`);
    }
}

export const getAuthors = async(parent: Author_model, args: Author_model, context: Context, info: Author_model): Promise<Author_model[]> => {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM authors;';
        
        const result = await conn.query(sql);

        const authors = result.rows

        conn.release();
        return authors
    } catch (err) {
        throw new Error(`Could not get authors. ${err}`);
    }
}