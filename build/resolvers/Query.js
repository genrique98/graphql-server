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
exports.users = exports.book = exports.feed = exports.info = void 0;
const database_1 = __importDefault(require("../database"));
function info() {
    return `This is a description`;
}
exports.info = info;
function feed(parent, args, context, info) {
    // return context.prisma.link.findMany()
}
exports.feed = feed;
function book(args) {
}
exports.book = book;
const users = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default.connect();
        const sql = 'Select * FROM users;';
        const result = yield conn.query(sql);
        const user = result.rows;
        conn.release();
        return user;
    }
    catch (err) {
        throw new Error(`Could not add user. ${err}`);
    }
});
exports.users = users;
//# sourceMappingURL=Query.js.map