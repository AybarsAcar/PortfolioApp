//imports to set up the server
const express = require("express");
const next = require("next");

//importing the apolloServer from our graphQL settings
const apollo = require("./graphql")

//importing middleware
const middleware = require("./middlewares")


const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//importing and connecting to our database
const db = require("./database");
db.connect();


app.prepare().then(() => {
  const server = express();

  //call the middleware to initialise the session
  middleware.init(server, db);

  //creating the server
  const apolloServer = apollo.createApolloServer();

  apolloServer.applyMiddleware({ app: server });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
