"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getTokenPayload(token) {
    const { TOKEN_SECRET } = process.env;
    return jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
}
function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            const userId = getTokenPayload(token);
            return userId;
        }
    }
    else if (authToken) {
        const userId = getTokenPayload(authToken);
        return userId;
    }
    // con
    throw new Error('Hey: Not authenticated');
}
exports.getUserId = getUserId;
//# sourceMappingURL=auth.js.map