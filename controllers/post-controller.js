'use strict'
const repository = require('../repositories/post-repository');
const _repo = new repository();
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function postController(){

}
postController.prototype.post = async(req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.conteudo,'o conteudo é obrigatória');
    _validationContract.isRequired(req.body.curso,'o curso é obrigatória');
    _validationContract.isRequired(req.body.dificuldadeMateria,'a dificuldadeMateria é obrigatória');
    _validationContract.isRequired(req.body.dificuldadeProfessor,'a dificuldadeProfessor é obrigatória');
    _validationContract.isRequired(req.body.faculdade,'a faculdade é obrigatória');
    _validationContract.isRequired(req.body.materia,'a materia é obrigatória');
    _validationContract.isRequired(req.body.numComentarios,'o numComentarios é obrigatória');
    _validationContract.isRequired(req.body.numLikes,'o numLikes é obrigatória');
    _validationContract.isRequired(req.body.professor,'o professor é obrigatória');
ctrlBase.post(_repo,_validationContract,req,res);
};
postController.prototype.put = async (req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.conteudo,'o conteudo é obrigatória');
    _validationContract.isRequired(req.body.curso,'o curso é obrigatória');
    _validationContract.isRequired(req.body.dificuldadeMateria,'a dificuldadeMateria é obrigatória');
    _validationContract.isRequired(req.body.dificuldadeProfessor,'a dificuldadeProfessor é obrigatória');
    _validationContract.isRequired(req.body.faculdade,'a faculdade é obrigatória');
    _validationContract.isRequired(req.body.materia,'a materia é obrigatória');
    _validationContract.isRequired(req.body.numComentarios,'o numComentarios é obrigatória');
    _validationContract.isRequired(req.body.numLikes,'o numLikes é obrigatória');
    _validationContract.isRequired(req.body.professor,'o professor é obrigatória');
    _validationContract.isRequired(req.params.id,'o id que será atualizado obrigatório');
ctrlBase.put(_repo,_validationContract,req,res);
};
postController.prototype.uncomment = async (req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.text,'o texto do comentário é obrigatório');
    _validationContract.isRequired(req.body.postedBy,'o id do usuario é obrigatório');
    _validationContract.isRequired(req.params.id,'o id do post que será atualizado obrigatório');

ctrlBase.uncomment(_repo,_validationContract,req,res);
};
postController.prototype.comment = async (req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.text,'o texto do comentário é obrigatório');
    _validationContract.isRequired(req.body.postedBy,'o id do usuario é obrigatório');
    _validationContract.isRequired(req.params.id,'o id do post que será atualizado obrigatório');
ctrlBase.comment(_repo,_validationContract,req,res);
};
postController.prototype.unlike = async (req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.likedBy,'o id do usuario é obrigatório');
    _validationContract.isRequired(req.params.id,'o id do post que será atualizado obrigatório');
ctrlBase.unlike(_repo,_validationContract,req,res);
};
postController.prototype.like = async (req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.likedBy,'o id do usuario é obrigatório');
    _validationContract.isRequired(req.params.id,'o id do post que será atualizado obrigatório');

ctrlBase.like(_repo,_validationContract,req,res);
};

postController.prototype.get = async(req,res)=>{
ctrlBase.get(_repo,req,res);
};
postController.prototype.getByPage = async(req,res)=>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.params.page,'pageNumber obrigatório');
    _validationContract.isRequired(req.params.lng,'lng obrigatório');
    _validationContract.isRequired(req.params.lat,'lat obrigatório');
    _validationContract.isRequired(req.params.maxdist,'maxdist obrigatório');
ctrlBase.getByPage(_repo,req,res);
};
postController.prototype.getById = async(req,res)=>{
ctrlBase.getById(_repo,req,res);
};
postController.prototype.delete = async(req,res)=>{
ctrlBase.delete(_repo,req,res);
};

module.exports = postController;