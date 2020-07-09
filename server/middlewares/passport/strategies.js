const { Strategy } = require("passport-strategy");

//Strategy gets options(email, password) needed to authenticate user
//Strategy gets a callback function that will contain functionality to verify the user
//Strategy has to have "authenticate" function (that's why we extend)
//Strategy has access to "error", "fail", "success" functions
class GraphqlStrategy extends Strategy {
  constructor(verify) {
    super();

    if (!verify) {
      throw new Error("Graphql strategy requires a verify callback");
    }

    this.verify = verify;
    this.name = "graphql";
  }

  //create the authenticate the funciton
  authenticate(req, options) {

    //in done, we will recieve "error", "user", "info"
    const done = (error, user, info) => {
      
      if (error) {
        return this.error(error);
      }
      if (!user) {
        return this.fail(401);
      }

      //if successfully authenticated
      return this.success(user, info);

    };

    this.verify(options, done);
  }
}

module.exports = GraphqlStrategy;
