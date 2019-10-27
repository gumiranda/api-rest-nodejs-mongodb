'use strict'
require('../models/photo-model');
const repository = require('../repositories/photo-repository');
const _repo = new repository();
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function photoController(){

}
photoController.prototype.post = async(req,res)=>{
let _validationContract = new validation();
ctrlBase.postPhoto(_repo,_validationContract,req,res);
};
photoController.prototype.postPhoto = async(req,res)=>{
    let _validationContract = new validation();    
    ctrlBase.postPhoto(_repo,_validationContract,req,res);
    };
photoController.prototype.put = async (req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome,'O nome do photo é obrigatório');
    _validationContract.isRequired(req.body.descricao,'A descrição do photo é obrigatória');
    _validationContract.isRequired(req.body.foto,'a foto do photo é obrigatória');
    _validationContract.isRequired(req.body.preco,'O nome do photo é obrigatório');
    if(req.body.preco){
        _validationContract.isTrue(req.body.preco == 0,'O preço do photo deve ser maior que zero');
    }
    
    ctrlBase.put(_repo,_validationContract,req,res);
};
photoController.prototype.get = async(req,res)=>{
    ctrlBase.get(_repo,req,res);

};
photoController.prototype.getById = async(req,res)=>{
    ctrlBase.getById(_repo,req,res);

};
photoController.prototype.delete = async(req,res)=>{
    ctrlBase.deletePhoto(_repo,req,res);
};

module.exports = photoController;