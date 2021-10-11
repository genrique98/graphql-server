import { Context, Publisher_model } from '../../models/models'
import Client from '../../database'

export const getPublishers = async(parent: Publisher_model, args: Publisher_model, context: Context, info: Publisher_model): Promise<Publisher_model[]> => {
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
}

export const getPublisher = async(parent: Publisher_model, args: Publisher_model, context: Context, info: Publisher_model): Promise<Publisher_model[]> => {
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