require('../models/chat-model');
const base = require('../bin/base/repository-base');
const fs = require('fs');
class chatRepository{
    constructor(){
this._base = new base('Chat');
    }
  async create(data){
    return await this._base.create(data);
    }
    async sendMessage(id,data,user){
return await this._base.sendMessage(id,data,user);
    }
    async deleteMessage(id,id2){
return await this._base.deleteMessage(id,id2);
    }
    async getAll(){
        return await this._base.getAll();
        }
    async getById(id){
        return await this._base.getById(id);
        }
    async getAllByPageWithoutGeo(page,coords,maxDist){
        return await this._base.getAllByPageWithoutGeo(page,coords,maxDist);
        }
    async delete(id){
        return await this._base.delete(id);
    }

}

module.exports = chatRepository;