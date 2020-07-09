//keep our graphQL functionality here
//instead of over crowding our index server file

const mongoose = require("mongoose");

//importing for graphql - Apollo
const { ApolloServer, gql } = require("apollo-server-express");

//resolvers
const {
  portfolioQueries,
  portfolioMutations,
  userMutations,
  userQueries,
} = require("./resolvers");
const { portfolioTypes, userTypes } = require("./types");

//importing our authentication function
const {buildAuthContext} = require("./context");

//GraphQL MODELS
const Portfolio = require("./models/Portfolio");
const User = require("./models/User");

exports.createApolloServer = () => {
  //Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]

      user: User
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }
  `;

  //The resolvers provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
    },
  };

  //informing our server to use graphql
  //everything that goes to graphql will be handled with graphql implementation
  //in graphqlHTTP() provide your configuration
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio")),
        User: new User(mongoose.model("User")),
      },
    }),
  });

  return apolloServer;
};
