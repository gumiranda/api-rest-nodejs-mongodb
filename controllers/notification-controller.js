'use strict'
require('../models/notification-model');
const repository = require('../repositories/notification-repository');
const _repo = new repository();
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function notificationController(){

}
notificationController.prototype.post = async(req,res)=>{
let _validationContract = new validation();
_validationContract.isRequired(req.body.content,'O conteúdo da notification é obrigatório');
ctrlBase.post(_repo,_validationContract,req,res);
};
notificationController.prototype.put = async (req,res)=>{
    let _validationContract = new validation();
    
    ctrlBase.put(_repo,_validationContract,req,res);
};
notificationController.prototype.get = async(req,res)=>{
    ctrlBase.get(_repo,req,res);

};
notificationController.prototype.getById = async(req,res)=>{
    ctrlBase.getById(_repo,req,res);

};
notificationController.prototype.delete = async(req,res)=>{
    ctrlBase.delete(_repo,req,res);

};

module.exports = notificationController;