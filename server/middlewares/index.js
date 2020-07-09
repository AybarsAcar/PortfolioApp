//initialising middlewares here
const config = require("../config/dev");
const session = require("express-session");

//importing the passport package and our passport
const passport = require("passport");
const passportPackage = require("./passport")

exports.init = (server, db) => {

  passportPackage.init(passport);

  //creating the session object
  const sess = {
    name: "portfolio-session",
    secret: config.SESSION_SECRET,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    resave: false,
    saveUnitialized: false,
    store: db.initSessionStore(),
  };

  //tell your server to use session
  server.use(session(sess));

  server.use(passport.initialize());
  
  //to initialise the authenticateion
  server.use(passport.session());
  
};
