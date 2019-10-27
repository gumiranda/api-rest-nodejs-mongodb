'use strict'
require('../models/scheduling-model');
const repository = require('../repositories/scheduling-repository');
const _repo = new repository();
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function schedulingController(){

}
schedulingController.prototype.post = async(req,res)=>{
let _validationContract = new validation();
_validationContract.isRequired(req.body.dataInicio,'A data do agendamento é obrigatória');
ctrlBase.post(_repo,_validationContract,req,res);
};
schedulingController.prototype.put = async (req,res)=>{
    let _validationContract = new validation();
    ctrlBase.put(_repo,_validationContract,req,res);
};
schedulingController.prototype.get = async(req,res)=>{
    ctrlBase.get(_repo,req,res);

};
schedulingController.prototype.getById = async(req,res)=>{
    ctrlBase.getById(_repo,req,res);

};
schedulingController.prototype.delete = async(req,res)=>{
    ctrlBase.delete(_repo,req,res);

};

module.exports = schedulingController;