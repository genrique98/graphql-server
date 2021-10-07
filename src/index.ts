import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { resolvers } from './resolvers/resolvers'
import { getUserId } from './utils/auth'
import cors from 'cors'

async function startApolloServer() {
  const app: express.Application = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'), 'utf8'
    ),
    resolvers,
    context: ({ req }) => {
      
      return {
        ...req,
        id: req && req.headers.authorization ? getUserId(req) : null
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    
  });
  await server.start();

  // Additional middleware can be mounted at this point to run before Apollo.
  app.use('*', cors); // app.use('*', jwtCheck, requireAuth, checkScope);
  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  
  return { 
    server, app 
  };
}

startApolloServer();