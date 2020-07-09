//import the strategy
const GraphqlStrategy = require("./strategies");

//importing our User database model
const User = require("../../database/models/user");


//creating an instance of our strategy -- and define the business strategy
exports.init = (passport) => {


  //serialising the user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
   //deserialising the user -- we keep the user id in the session
   passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    })
  })



  passport.use("graphql", new GraphqlStrategy(({email, password}, done) => {

    //1. Find user in DB and if user exists verify user password
    //If user is authenticated call the done function to notify the strategy
    User.findOne({email}, (error, user) => {
      if (error) {
        return done(error);
      }
      //null for an error, false for the user
      if (!user) {
        return done(null, false);
      }
      
      //check the passport
      user.validatePassword(password, (err, isMatching) => {
        if (err){
          return done(err);
        } 

        if (!isMatching){
          return done(null, false);
        }

        //if success
        return done(null, user);
      })
    })

  }));
}