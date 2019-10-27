require('../models/photo-model');
const base = require('../bin/base/repository-base');
class photoRepository{
    constructor(){
this._base = new base('Photo');
    }
  async create(data){
return await this._base.create(data);
    }
    async createPhoto(data,body){
        return await this._base.createPhoto(data,body);
            }
    async update(id,data){
return await this._base.update(id,data);
    }
    async getAll(){
        return await this._base.getAll();
        }
    async getById(id){
        return await this._base.getById(id);
        }
    async deletePhoto(id){
        return await this._base.deletePhoto(id);
    }
}

module.exports = photoRepository;