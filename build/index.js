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
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resolvers_1 = require("./resolvers/resolvers");
const auth_1 = require("./utils/auth");
const cors_1 = __importDefault(require("cors"));
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        const httpServer = http_1.default.createServer(app);
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: fs_1.default.readFileSync(path_1.default.join(__dirname, 'schema.graphql'), 'utf8'),
            resolvers: resolvers_1.resolvers,
            context: ({ req }) => {
                return Object.assign(Object.assign({}, req), { id: req && req.headers.authorization ? auth_1.getUserId(req) : null });
            },
            plugins: [
                apollo_server_core_1.ApolloServerPluginDrainHttpServer({ httpServer }),
                apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground(),
            ],
        });
        yield server.start();
        // Additional middleware can be mounted at this point to run before Apollo.
        app.use(cors_1.default()); // app.use('*', jwtCheck, requireAuth, checkScope);
        server.applyMiddleware({ app });
        yield new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        return {
            server, app
        };
    });
}
startApolloServer();
//# sourceMappingURL=index.js.map