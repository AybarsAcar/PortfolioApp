exports.mixedQueries = {
  highlight: async (root, {limit = 3}, ctx) => {

    const portfolios = await ctx.models.Portfolio.getRandoms(limit);
    const topics = await ctx.models.Topic.getRandoms(limit);

    return {
      portfolios: portfolios,
      topics: topics
    }
  }
}

exports.portfolioQueries = {
  portfolio: (root, { id }, ctx) => {
    return ctx.models.Portfolio.getById(id);
  },
  portfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAll();
  },
  userPortfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAllByUser();
  },
};

exports.portfolioMutations = {
  createPortfolio: async (root, { input }, ctx) => {
    const newPortfolio = await ctx.models.Portfolio.create(input);
    return newPortfolio;
  },

  updatePortfolio: async (root, { id, input }, ctx) => {
    const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(
      id,
      input
    );
    return updatedPortfolio;
  },

  deletePortfolio: async (root, { id }, ctx) => {
    const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
    return deletedPortfolio._id;
  },
};

//AUthentication mutations and queries
exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  },
};

exports.userMutations = {
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser._id;
  },
  signIn: (root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  },
};

//forum queries
exports.forumQueries = {
  forumCategories: (root, args, ctx) => {
    return ctx.models.ForumCategory.getAll();
  },

  topicsByCategory: async (root, { category }, ctx) => {
    const forumCategory = await ctx.models.ForumCategory.getBySlug(category);

    if (!forumCategory) throw new Error("specify a category");

    return ctx.models.Topic.getAllByCategory(forumCategory._id);
  },
  topicBySlug: (root, {slug}, ctx) => {
    return ctx.models.Topic.getBySlug(slug);
  },

  postsByTopic: async (root, {slug, ...pagination}, ctx) => {
    //firts get its topic slug
    const topic = await ctx.models.Topic.getBySlug(slug);
    //now get the post
    const posts = await ctx.models.Post.getAllByTopic({topic, ...pagination});
    return posts;
  }
};

exports.forumMutations = {
  createTopic: async (root, { input }, ctx) => {

    //fetching the slug of the category and overwriting it with its id
    const category = await ctx.models.ForumCategory.getBySlug(input.forumCategory);
    input.forumCategory = category._id;

    const topic = await ctx.models.Topic.create(input);
    return topic;
  },

  createPost: async (root, {input}, ctx) => {

    const post = await ctx.models.Post.create(input);
    return post;
  }
};
