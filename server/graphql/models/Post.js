const uniqueSlug = require("unique-slug");
const moment = require("moment");
const BaseModel = require("./BaseModel");

class Post extends BaseModel{
  

  async getAllByTopic({topic, pageNum = 1, pageSize = 5}) {

    //for pagination
    const skips = pageSize * (pageNum - 1);

    //getting the count of posts for pagination
    const count = await this.Model.countDocuments({topic})

    //get all the posts that the topic is matching
    const posts = await this.Model.find({ topic })
      .sort("createdAt")
      //i.e for page 2 it will skip the first 5 items
      .skip(skips)
      //how many items we need to fetch
      .limit(pageSize)
      .populate("topic")
      .populate("user")
      .populate({ path: "parent", populate: "user" });

    return {posts, count};
  }

  async create(post) {
    if (!this.user) throw new Error("Login to create a post");

    post.user = this.user;

    //generate the time when post created at
    const createdAt = moment().toISOString();
    //generate the slug part
    const slugPart = uniqueSlug();
    const fullSlugPart = createdAt + ":" + slugPart;

    //check for the parents --
    if (post.parent) {
      const parent = await this.Model.findById(post.parent);

      post.slug = parent.slug + "/" + slugPart;
      post.fullSlug = parent.fullSlug + "/" + fullSlugPart;
    } else {
      post.slug = slugPart;
      post.fullSlug = fullSlugPart;
    }

    //
    const createdPost = await this.Model.create(post);
    return this.Model.findById(createdPost._id)
      .populate("topic")
      .populate("user")
      .populate({ path: "parent", populate: "user" });
  }
}

module.exports = Post;
