import { gql } from "apollo-server-express"

export const typeDefs = gql`
    type Query {
        info: String!
        feed: [Link!]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`;
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

  interface Link  {
      id: string,
      description: string,
      url: string
  }
  
export const resolvers = {
    Query: {
        info: () => `This is a description`,
        feed: () => links,
      },
      Link: {
        id: (parent:Link) => parent.id,
        description: (parent:Link) => parent.description,
        url: (parent:Link) => parent.url,
      }
};