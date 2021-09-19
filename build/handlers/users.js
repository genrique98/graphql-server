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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../auth/auth"));
const store = new users_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        console.log(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.show(req.params.id);
        res.json(users);
    }
    catch (err) {
        console.log(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    const user = {
        firstName: request.firstName,
        lastName: request.lastName,
        username: request.username,
        password: request.password,
    };
    const { TOKEN_SECRET } = process.env;
    try {
        const newUser = yield store.create(user);
        let token = jsonwebtoken_1.default.sign({ user: newUser }, TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        console.log(err);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.firstName;
    const password = req.body.password;
    const { TOKEN_SECRET } = process.env;
    try {
        const authUser = yield store.authenticate(username, password);
        let token = jsonwebtoken_1.default.sign({ user: authUser }, TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
});
const users_routes = (app) => {
    app.post('/auth', authenticate);
    app.get('/users', auth_1.default, index);
    app.get('/users/:id', auth_1.default, show);
    app.post('/users', create);
};
exports.default = users_routes;
//# sourceMappingURL=users.js.map