const slugify = require("slugify");
const uniqueSlug = require("unique-slug");
const BaseModel = require("./BaseModel");

class Topic extends BaseModel{

  async getRandoms(limit) {
    const query = await super.getRandoms(limit);
    return query().populate("user")
  }

  getBySlug(slug) {
    return this.Model.findOne({slug}).populate('user').populate('forumCategory');
  }

  //search and return all the topics in that specific forumCategory
  //telling the mongoose that i want the user and the forumCategory back as well
  getAllByCategory(forumCategory) {
    return this.Model.find({ forumCategory })
      .populate("user")
      .populate("forumCategory");
  }

  async _create(data) {
    const createdTopic = await this.Model.create(data);
    return this.Model.findById(createdTopic._id)
      .populate("user")
      .populate("forumCategory");
  }

  //definin the create function to create a topic
  async create(topicData) {
    if (!this.user) throw new Error("Login to create a topic");

    topicData.user = this.user;

    //generate slug from the title
    topicData.slug = slugify(topicData.title, { lower: true });

    let topic;
    try {
      topic = await this._create(topicData);
      return topic;
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
        topicData.slug += `-${uniqueSlug()}`;

        topic = await this._create(topicData);
        return topic;
      }
      return null;
    }
  }
}

module.exports = Topic;
