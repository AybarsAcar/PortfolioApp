class User {
  constructor(model) {
    this.Model = model;
  }

  getAuthUser(ctx){
    if (ctx.isAuthenticated()){
      return ctx.getUser();
    }

    return null
  }

  async signIn(signInData, ctx) {
    try {
      const user = await ctx.authenticate(signInData);
      return user;
    } catch (err) {
      return err;
    }
  }

  async signUp(signUpData) {
    //checking password confirmation
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Confirmation must match the password");
    }

    //try catch block to handle the error
    try {
      //creating the user
      return await this.Model.create(signUpData);
    } catch (err) {
      if (err.code && err.code === 11000) {
        throw new Error("User with this email already exists");
      }

      throw e;
    }
  }

  signOut(ctx) {
    try {
      console.log("BEFORE LOGOUT");
      console.log("is authenticated", ctx.isAuthenticated());
      console.log("user", ctx.getUser());

      ctx.logout();
      console.log("AFTER AUTHENTICATED");
      console.log("is authenticated", ctx.isAuthenticated());
      console.log("user", ctx.getUser());

      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = User;
