//implementing the authetication functionality

const passport = require("passport");

//the entry point of our authentication
//authenticating the user
//options = {email, passport}
const authenticateUser = (req, options) => {
  //we can now wait until the Promise is resolved
  return new Promise((resolve, reject) => {

    const done = (err, user) => {

      if (err) {
        return reject(new Error(err));
      }

      if (user) {
        //if we get the user here we can save session to DB
        //login comes from passport
        req.login(user, (err) => {

          if (err) {
            return reject(new Error(err));
          }

          return resolve(user);
        })

      } else {
        return reject(new Error("Invalid password or email"));
      }
    };

    const authFn = passport.authenticate("graphql", options, done);
    authFn();
  });
};

exports.buildAuthContext = (req) => {
  const auth = {
    //authenticating the user
    authenticate: (options) => authenticateUser(req, options),

    logout: () => req.logout(),

    isAuthenticated: () => req.isAuthenticated(),

    getUser: () => req.user,
  };

  return auth;
};
