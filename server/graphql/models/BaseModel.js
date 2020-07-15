class BaseModel {

  //import the model from outside to make this class reusable
  constructor(model, user = null){
    this.Model = model;
    this.user = user;
  }

  async getRandoms(limit) {
    //now generate some random data
    const count = await this.Model.countDocuments();
    let randIdx;
    
    if (limit > count) {
      randIdx = 0;
    } else {
      randIdx = count - limit;
    }

    const random = Math.round(Math.random() * randIdx);
    return () => this.Model.find({}).skip(random).limit(limit);
  }
}

module.exports = BaseModel;