import { Book_model, User_model, Context, Author_model, Publisher_model } from '../models/models'
import Client from '../database'

export const Query = {
    info: () => { return `This is a description`; },
    users: async(parent: User_model, args: User_model, context: Context, info: User_model): Promise<User_model[]> => {
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
    },
    user: async(parent: User_model, args: User_model, context: Context, info: User_model): Promise<User_model[]> => {
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
    },
    book: async(parent: User_model, args: User_model, context: Context, info: User_model): Promise<Book_model[]> => {
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
    },
    books: async(parent: Book_model, args: Book_model, context: Context, info: Book_model): Promise<Book_model[]> => {
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
    },
    author: async(parent: Author_model, args: Author_model, context: Context, info: Author_model): Promise<Author_model[]> => {
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
    },
    authors: async(parent: Author_model, args: Author_model, context: Context, info: Author_model): Promise<Author_model[]> => {
        // if (!context.id) throw new Error('you must be logged in');
        
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
    },
    publishers: async(parent: Publisher_model, args: Publisher_model, context: Context, info: Publisher_model): Promise<Publisher_model[]> => {
        // if (!context.id) throw new Error('you must be logged in');
        
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM publishers;';
            
            const result = await conn.query(sql);
    
            const publisher = result.rows
    
            conn.release();
            return publisher
        } catch (err) {
            throw new Error(`Could not get publishers. ${err}`);
        }
    },
    publisher: async(parent: Publisher_model, args: Publisher_model, context: Context, info: Publisher_model): Promise<Publisher_model[]> => {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM publishers WHERE id=($1);';
            
            const result = await conn.query(sql, [args.id]);
    
            const publisher = result.rows[0]
    
            conn.release();
            return publisher
        } catch (err) {
            throw new Error(`Could not get publisher. ${err}`);
        }
    }
    
}
