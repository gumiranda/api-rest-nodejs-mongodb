require('../models/post-model');
const base = require('../bin/base/repository-base');
const fs = require('fs');
class postRepository{
    constructor(){
this._base = new base('Post');
    }
  async create(data){
    return await this._base.create(data);
    }
    async update(id,data){
return await this._base.update(id,data);
    }
    async like(id,data){
return await this._base.like(id,data);
    }
    async unlike(id,data){
return await this._base.unlike(id,data);
    }
    async comment(id,data){
return await this._base.comment(id,data);
    }
    async uncomment(id,data){
return await this._base.uncomment(id,data);
    }
    async getAll(){
        return await this._base.getAll();
        }
    async getById(id){
        return await this._base.getById(id);
        }
    async getAllByPage(page,coords,maxDist){
        return await this._base.getAllByPage(page,coords,maxDist);
        }
    async delete(id){
        return await this._base.delete(id);
    }

}

module.exports = postRepository;