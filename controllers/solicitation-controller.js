'use strict'
require('../models/solicitation-model');
const repository = require('../repositories/solicitation-repository');
const _repo = new repository();
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function solicitationController(){

}
solicitationController.prototype.post = async(req,res)=>{
let _validationContract = new validation();
_validationContract.isRequired(req.body.materia,'O materia do solicitation é obrigatório');
_validationContract.isRequired(req.body.descricao,'A descrição do solicitation é obrigatória');
_validationContract.isRequired(req.body.foto,'a foto do solicitation é obrigatória');
_validationContract.isRequired(req.body.preco,'O materia do solicitation é obrigatório');
if(req.body.preco){
    _validationContract.isTrue(req.body.preco == 0,'O preço do solicitation deve ser maior que zero');
}

ctrlBase.post(_repo,_validationContract,req,res);
};
solicitationController.prototype.put = async (req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.materia,'O materia do solicitation é obrigatório');
    _validationContract.isRequired(req.body.descricao,'A descrição do solicitation é obrigatória');
    _validationContract.isRequired(req.body.foto,'a foto do solicitation é obrigatória');
    _validationContract.isRequired(req.body.preco,'O materia do solicitation é obrigatório');
    if(req.body.preco){
        _validationContract.isTrue(req.body.preco == 0,'O preço do solicitation deve ser maior que zero');
    }
    
    ctrlBase.put(_repo,_validationContract,req,res);
};
solicitationController.prototype.get = async(req,res)=>{
    ctrlBase.get(_repo,req,res);

};
solicitationController.prototype.getById = async(req,res)=>{
    ctrlBase.getById(_repo,req,res);

};
solicitationController.prototype.delete = async(req,res)=>{
    ctrlBase.delete(_repo,req,res);

};

module.exports = solicitationController;