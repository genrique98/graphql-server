"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPublisher = exports.addAuthor = exports.addBook = exports.login = exports.signup = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default.connect();
        const sql = 'INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
        const hash = yield bcrypt_1.default.hashSync(args.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
        const sqlargs = [args.name, args.email, args.username, hash];
        yield conn.query(sql, sqlargs);
        const token = jsonwebtoken_1.default.sign({ id: args.id }, TOKEN_SECRET);
        const payload = { token: token, user: args };
        conn.release();
        return payload;
    }
    catch (err) {
        throw new Error(`Could not add user ${args.name}. ${err}`);
    }
});
exports.signup = signup;
const login = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE email=($1)';
        const result = yield conn.query(sql, [args.email]);
        const { BCRYPT_PASSWORD, TOKEN_SECRET } = process.env;
        conn.release();
        if (result.rows.length) {
            const user = result.rows[0];
            const verified = yield bcrypt_1.default.compareSync(args.password + BCRYPT_PASSWORD, user.password);
            if (verified) {
                console.log('user is verified');
                const token = jsonwebtoken_1.default.sign({ id: user.id }, TOKEN_SECRET);
                const payload = { token: token, user: user };
                return payload;
            }
            else {
                console.log('bcrypt error');
                throw new Error('Invalid password');
            }
        }
        else {
            throw new Error('No such user found');
        }
    }
    catch (err) {
        throw new Error(`Could not authenticate user ${args.email}. ${err}`);
    }
});
exports.login = login;
const addBook = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!context.id)
        throw new Error('you must be logged in');
    try {
        const { id } = context; // use id in context // actuallly, fix this
        const conn = yield database_1.default.connect();
        const sql = 'INSERT INTO books (title, category, author_id, publisher_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const sqlargs = [args.title, args.category, args.author_id, args.publisher_id];
        const result = yield conn.query(sql, sqlargs);
        conn.release();
        const book = result.rows[0];
        // const book = {
        //     id: id,
        //     title: args.title,
        //     category: args.category,
        //     author_id: args.author_id,
        //     publisher_id: args.publisher_id,
        // }
        return book;
    }
    catch (err) {
        throw new Error(`Could not add book ${args.title}. ${err}`);
    }
});
exports.addBook = addBook;
const addAuthor = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!context.id) throw new Error('you must be logged in');
    try {
        const conn = yield database_1.default.connect();
        const sql = 'INSERT INTO authors (name, lastName, bio) VALUES ($1, $2, $3) RETURNING *';
        const sqlargs = [args.name, args.lastName, args.bio];
        const result = yield conn.query(sql, sqlargs);
        const author = result.rows[0];
        conn.release();
        return author;
    }
    catch (err) {
        throw new Error(`Could not add author ${args.name}. ${err}`);
    }
});
exports.addAuthor = addAuthor;
const addPublisher = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default.connect();
        const sql = 'INSERT INTO publisher (name) VALUES ($1) RETURNING *';
        const sqlargs = [args.name];
        const result = yield conn.query(sql, sqlargs);
        conn.release();
        const publisher = result.rows[0];
        return publisher;
    }
    catch (err) {
        throw new Error(`Could not add publisher ${args.name}. ${err}`);
    }
});
exports.addPublisher = addPublisher;
//# sourceMappingURL=Mutation.js.map