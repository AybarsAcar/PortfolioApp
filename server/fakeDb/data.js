const mongoose = require("mongoose");
const moment = require("moment");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const forum1Id = mongoose.Types.ObjectId();
const forum2Id = mongoose.Types.ObjectId();
const forum3Id = mongoose.Types.ObjectId();

const topicId = mongoose.Types.ObjectId();

const post1Id = mongoose.Types.ObjectId();
const post2Id = mongoose.Types.ObjectId();
const post3Id = mongoose.Types.ObjectId();
const post4Id = mongoose.Types.ObjectId();

const post1CreatedAt = moment().subtract(7, "days");
const post2CreatedAt = moment(post1CreatedAt).add(1, "days");
const post3CreatedAt = moment(post2CreatedAt).add(1, "days");
const post4CreatedAt = moment(post3CreatedAt).add(1, "days");

const avatarImg =
  "https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png";

//creating data
const data = {
  users: [
    {
      _id: user1Id,
      avatar: avatarImg,
      email: "user1@gmail.com",
      name: "Admin Acar",
      username: "aybarsacar",
      info: "Hello I am Aybars and I am an engineer",
      password: "test1234",
      role: "admin",
    },
    {
      _id: user2Id,
      avatar: avatarImg,
      email: "user2@gmail.com",
      name: "Test User",
      username: "testuser",
      info: "Hello I am a test user",
      password: "test1234",
    },
  ],

  portfolios: [
    {
      title: "Job in Netcentric",
      company: "Netcentric",
      companyWebsite: "www.google.com",
      location: "Spain, Barcelona",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "01/01/2014",
      endDate: "01/01/2016",
      user: user1Id,
    },
    {
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "01/01/2011",
      endDate: "01/01/2013",
      user: user1Id,
    },
    {
      title: "Work in USA",
      company: "WhoKnows",
      companyWebsite: "www.google.com",
      location: "USA, Montana",
      jobTitle: "Housekeeping",
      description: "So much responsibility....Overloaaaaaad",
      startDate: "01/01/2010",
      endDate: "01/01/2011",
      user: user1Id,
    },
  ],
  forumCategories: [
    {
      _id: forum1Id,
      title: "General Discussion",
      subTitle: "Open to any topic you want",
      slug: "general-discussion",
    },
    {
      _id: forum2Id,
      title: "Job Requests",
      subTitle: "Post here job opportunities",
      slug: "job-requests",
    },
    {
      _id: forum3Id,
      title: "Developer Jokes",
      subTitle: "Just funny dev jokes",
      slug: "developer-jokes",
    },
  ],
  topics: [
    {
      _id: topicId,
      title: "How to learn JS",
      slug: "how-to-learn-js",
      content:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      title: "How to learn Java",
      slug: "how-to-learn-java",
      content:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      title: "How to learn C++",
      slug: "how-to-learn-c++",
      content:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      forumCategory: forum1Id,
      user: user1Id,
    },
  ],
  posts: [
    {
      _id: post1Id,
      content: "Hey there how are you ?",
      slug: "md43",
      fullSlug: post1CreatedAt.toISOString() + ":md43",
      topic: topicId,
      user: user1Id,
      createdAt: post1CreatedAt,
    },
    {
      _id: post2Id,
      content: "What do you think about this?",
      slug: "md59",
      fullSlug: post2CreatedAt.toISOString() + ":md59",
      topic: topicId,
      user: user2Id,
      createdAt: post2CreatedAt,
    },
    {
      _id: post3Id,
      content: "I think its nice (:",
      slug: "md59/md79",
      fullSlug:
        post2CreatedAt.toISOString() +
        ":md59" +
        "/" +
        post3CreatedAt.toISOString() +
        ":md79",
      topic: topicId,
      user: user1Id,
      createdAt: post3CreatedAt,
      parent: post2Id,
    },
    {
      _id: post4Id,
      content: "Good to hear that!",
      slug: "md59/md79/md89",
      fullSlug:
        post2CreatedAt.toISOString() +
        ":md59" +
        "/" +
        post3CreatedAt.toISOString() +
        ":md79" +
        "/" +
        post4CreatedAt.toISOString() +
        ":md89",
      topic: topicId,
      user: user2Id,
      createdAt: post4CreatedAt,
      parent: post3Id,
    },
  ],
};

module.exports = data;
