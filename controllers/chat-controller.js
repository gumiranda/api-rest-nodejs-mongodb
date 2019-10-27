'use strict'
const repository = require('../repositories/chat-repository');
const _repo = new repository();
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function chatController(){

}
chatController.prototype.post = async(req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.lastMessage,'o lastMessage é obrigatória');
    _validationContract.isRequired(req.body.nomeUser,'o titulo é obrigatório');
    _validationContract.isRequired(req.body.userDest,'a userDest é obrigatória');
    _validationContract.isRequired(req.body.userRemet,'a userRemet é obrigatória');
ctrlBase.post(_repo,_validationContract,req,res);
};

chatController.prototype.deleteMessage = async (req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.text,'o texto do comentário é obrigatório');
    _validationContract.isRequired(req.params.id,'o id do chat que será atualizado obrigatório');
ctrlBase.deleteMessage(_repo,_validationContract,req,res);
};
chatController.prototype.sendMessage = async (req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.text,'o texto do comentário é obrigatório');
    _validationContract.isRequired(req.params.id,'o id do chat que será atualizado obrigatório');
ctrlBase.sendMessage(_repo,_validationContract,req,res);
};


chatController.prototype.get = async(req,res)=>{
ctrlBase.get(_repo,req,res);
};
chatController.prototype.getByPage = async(req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.params.page,'pageNumber obrigatório');
ctrlBase.getByPageWithoutGeo(_repo,req,res);
};
chatController.prototype.getById = async(req,res)=>{
ctrlBase.getById(_repo,req,res);
};
chatController.prototype.delete = async(req,res)=>{
ctrlBase.delete(_repo,req,res);
};

module.exports = chatController;