'use strict'
const mongoose = require('mongoose')
const aws = require('aws-sdk');
const s3 = new aws.S3();
class baseRepository {
  constructor (model) {
    this._model = mongoose.model(model);
  }
  async create (data) {
    let modelo = new this._model(data);
    let resultado = await modelo.save();
    return resultado;
  }
  async createPhoto (file,body) {
    let modelo = new this._model({
      name:file.originalname,
      size:file.size,
      chave:file.key,
      url:file.location
    });
    let resultado = await modelo.save();
    return resultado;
  }
  async update (id, data) {
    await this._model.findByIdAndUpdate(id, { $set: data })
    let resultado = await this._model.findById(id)
    return resultado
  }
  async like (id, data) {
    let result = await this._model
      .findById(id)
      .find({ likes: { $elemMatch: { likedBy: data.likedBy } } });
    if (result.length == 0) {
      await this._model
        .findByIdAndUpdate(id, { $push: { likes: data }, $inc:{numLikes:1}  }, { new: true })
        .exec((err, result) => {
          if (!err) {
            return result
          }
        });
    }
    let resultado = await this._model.findById(id);
    return resultado;
  }
  async unlike (id, data) {
    let result = await this._model
      .findById(id)
      .find({ likes: { $elemMatch: { likedBy: data.likedBy } } });
    if (result.length > 0 ) {
      await this._model
        .findByIdAndUpdate(id, { $pull: { likes: data } , $inc:{numLikes:-1} }, { new: true })
        .exec((err, result) => {
          if (!err) {
            return result
          }
        })
    }
    let resultado = await this._model.findById(id);
    return resultado;
  }
  async follow(id, data) {
    const session = await this._model.startSession();
    let result = await this._model
    .findById(id)
    .find({ followers: { $elemMatch: { followedBy: data.user._id } } });
    console.log(result);
  if (result.length == 0) {
    session.startTransaction();
    try {
      const opts = { session }; 
      const B = await this._model.findByIdAndUpdate(data.user._id, { $push: { following: {followedBy:id} }, $inc:{numSeguindo: 1} }, { new: true });
      const A = await this._model.findByIdAndUpdate(id, { $push: { followers: {followedBy:data.user._id}  }, $inc:{numSeguidores: 1} }, { new: true });
      await session.commitTransaction();
      session.endSession();
      //let resultado = await this._model.findById(id);
      let resultado = await this._model.findById(data.user._id);
      return resultado;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error; 
    }
  }
  }
  async unfollow(id, data) {
    const session = await this._model.startSession();
    let result = await this._model
    .findById(data.user._id)
    .find({ following: { $elemMatch: { followedBy: id } } });
    console.log(result);
  if (result.length > 0) {
    session.startTransaction();
    try {
      const opts = { session };
      const B = await this._model.findByIdAndUpdate(data.user._id, { $pull: { following: {followedBy:id} }, $inc:{numSeguindo: -1} }, { new: true });
      const A = await this._model.findByIdAndUpdate(id, { $pull: { followers: {followedBy:data.user._id}  }, $inc:{numSeguidores: 1} }, { new: true });
       await session.commitTransaction();
      session.endSession();
      //let resultado = await this._model.findById(id);
      let resultado = await this._model.findById(data.user._id);
      return resultado;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error; 
    }
  } else{
    let resultado = await this._model.findById(data.user._id);
    return resultado;
  }

  }
  async comment (id, data) {
    await this._model
      .findByIdAndUpdate(id, { $push: { comments: data } }, { new: true })
      .exec((err, result) => {
        if (!err) {
          return result
        }
      })
    let resultado = await this._model.findById(id)
    return resultado
  }
  async sendMessage (id, data,user) {
    console.log(user);
    await this._model
      .findByIdAndUpdate(id, { $push: { messages: {text:data.text,date:Date.now,createdBy:user._id} } }, { new: true })
      .exec((err, result) => {
        if (!err) {
          return result
        }
      })
    let resultado = await this._model.findById(id)
    return resultado
  }
  async deleteMessage (idChat,idMessage) {
    let result = await this._model
    .findById(idChat)
    .findOneAndUpdate({ messages: { $elemMatch: { _id: idMessage } } },{ $pull: { messages: { _id:idMessage } } }, { new: true })
    .exec((err, result) => {
      if (!err) {
        return result
      }
    });
    return result
  }
  async uncomment (id, data) {
    await this._model
      .findByIdAndUpdate(id, { $pull: { comments: data } }, { new: true })
      .exec((err, result) => {
        if (!err) {
          return result
        }
      })
    let resultado = await this._model.findById(id)
    return resultado
  }
  async getAll () {
    return await this._model.find()
  }
  async getAll () {
    return await this._model.find()
  }
  async getByCoordinate (coords, maxDist) {
    return await this._model.find({
      coords: {
        $near: [parseFloat(coords[0]), parseFloat(coords[1])],
        $maxDistance: parseFloat(maxDist)
      }
    })
  }

  async getById(id) {
    return await this._model.findById(id)
  }

  async getAllByPage(page,coords,maxDist) {
    let cords = [parseFloat(coords[0])- 53.1, parseFloat(coords[1])- 27.9];
    return await this._model.find({
      coords: {
        $near: cords,
        $maxDistance: parseFloat(maxDist)
      }
    }).skip((page - 1) * 10).limit(10).sort({dataCriacao: -1 });//.select('_id dataCriacao');
  }
  async getAllByPageWithoutGeo(page) {
    return await this._model.find(
    ).skip((page - 1) * 10).limit(10).sort({dataCriacao: -1 });//.select('_id dataCriacao');
  }
  async deletePhoto (id) {
    let photo = await this._model.findById(id);
    this._model.findOneAndDelete(id);
    return s3.deleteObject({
      Bucket:'graduandoeasy',
      Key:photo.chave
    }).promise();
  }
  async delete (id) {
  return await this._model.findByIdAndDelete(id);
  }
}

module.exports = baseRepository
