require('../models/solicitation-model');
const base = require('../bin/base/repository-base');
class solicitationRepository{
    constructor(){
this._base = new base('Solicitation');
    }
  async create(data){
return await this._base.create(data);
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
    async delete(id){
        return await this._base.delete(id);
    }
}

module.exports = solicitationRepository;