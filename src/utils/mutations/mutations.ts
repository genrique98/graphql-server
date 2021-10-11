import { Author_model, Book_model, Publisher_model, Context } from '../../models/models'
import Client from '../../database'

export const addBook = async(parent: Book_model, args: Book_model, context: Context, info: Book_model): Promise<Book_model> => {
    
    if (!context.id) throw new Error('you must be logged in');

    try {

        const { id } = context; // use id in context // actuallly, fix this

        const conn = await Client.connect();
        const sql = 'INSERT INTO books (title, category, author_id, publisher_id) VALUES ($1, $2, $3, $4) RETURNING *';

        const sqlargs = [args.title, args.category, args.author_id, args.publisher_id];
        
        const result = await conn.query(sql, sqlargs);

        conn.release();

        const book = result.rows[0];

        return book;
    } catch (err) {
        throw new Error(`Could not add book ${args.title}. ${err}`);
    }
}

export const addAuthor = async(parent: Author_model, args: Author_model, context: Context, info: Author_model): Promise<Author_model> => {
    // if (!context.id) throw new Error('you must be logged in');
    try {
        const conn = await Client.connect();
        const sql = 'INSERT INTO authors (name, lastName, bio) VALUES ($1, $2, $3) RETURNING *';

        const sqlargs = [args.name, args.lastName, args.bio];
        
        const result = await conn.query(sql, sqlargs);

        const author = result.rows[0]

        conn.release();

        return author;
    } catch (err) {
        throw new Error(`Could not add author ${args.name}. ${err}`);
    }
}

export const addPublisher = async(parent: Publisher_model, args: Publisher_model, context: Context, info: Publisher_model): Promise<Publisher_model> => {
    try {

        const conn = await Client.connect();
        const sql = 'INSERT INTO publishers (name) VALUES ($1) RETURNING *';

        const sqlargs = [args.name];
        
        const result = await conn.query(sql, sqlargs);

        conn.release();

        const publisher = result.rows[0]

        return publisher;
    } catch (err) {
        throw new Error(`Could not add publisher ${args.name}. ${err}`);
    }
}