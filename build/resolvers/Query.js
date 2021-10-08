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
exports.publisher = exports.publishers = exports.author = exports.authors = exports.user = exports.users = exports.books = exports.book = exports.info = void 0;
const database_1 = __importDefault(require("../database"));
function info() {
    return `This is a description`;
}
exports.info = info;
const book = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM books WHERE id=($1)';
        const result = yield conn.query(sql, [args.id]);
        const book = result.rows;
        conn.release();
        return book[0];
    }
    catch (err) {
        throw new Error(`Could not get book. ${err}`);
    }
});
exports.book = book;
const books = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM books;';
        const result = yield conn.query(sql);
        const books = result.rows;
        conn.release();
        return books;
    }
    catch (err) {
        throw new Error(`Could not get books. ${err}`);
    }
});
exports.books = books;
const users = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!context.id)
        throw new Error('you must be logged in');
    try {
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM users;';
        const result = yield conn.query(sql);
        const user = result.rows;
        conn.release();
        return user;
    }
    catch (err) {
        throw new Error(`Could not get users. ${err}`);
    }
});
exports.users = users;
const user = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE id=($1);';
        const result = yield conn.query(sql, [args.id]);
        const user = result.rows[0];
        conn.release();
        return user;
    }
    catch (err) {
        throw new Error(`Could not get user. ${err}`);
    }
});
exports.user = user;
const authors = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!context.id) throw new Error('you must be logged in');
    try {
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM authors;';
        const result = yield conn.query(sql);
        const authors = result.rows;
        conn.release();
        return authors;
    }
    catch (err) {
        throw new Error(`Could not get authors. ${err}`);
    }
});
exports.authors = authors;
const author = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM authors WHERE id=($1);';
        const result = yield conn.query(sql, [args.id]);
        const author = result.rows[0];
        console.log(author);
        conn.release();
        return author;
    }
    catch (err) {
        throw new Error(`Could not get author. ${err}`);
    }
});
exports.author = author;
const publishers = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!context.id) throw new Error('you must be logged in');
    try {
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM publishers;';
        const result = yield conn.query(sql);
        const publisher = result.rows;
        conn.release();
        return publisher;
    }
    catch (err) {
        throw new Error(`Could not get publishers. ${err}`);
    }
});
exports.publishers = publishers;
const publisher = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM publishers WHERE id=($1);';
        const result = yield conn.query(sql, [args.id]);
        const publisher = result.rows[0];
        conn.release();
        return publisher;
    }
    catch (err) {
        throw new Error(`Could not get publisher. ${err}`);
    }
});
exports.publisher = publisher;
//# sourceMappingURL=Query.js.map