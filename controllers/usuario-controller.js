"use strict";
const repository = require("../repositories/usuario-repository");
const validation = require("../bin/helpers/validation");
const ctrlBase = require("../bin/base/controller-base");
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
const _repo = new repository();
function usuarioController() {}
usuarioController.prototype.post = async (req, res) => {
  let _validationContract = new validation();
  _validationContract.isRequired(req.body.nome, "Informe seu nome");
  _validationContract.isRequired(req.body.email, "Informe seu email");
  _validationContract.isEmail(req.body.email, "Email inválido");
  _validationContract.isRequired(req.body.senha, "Senha obrigatória");
  _validationContract.isRequired(
    req.body.senhaConfirmacao,
    "Senha de confirmação é obrigatória"
  );
  _validationContract.isTrue(
    req.body.senha != req.body.senhaConfirmacao,
    "A senha e a confirmação devem ser iguais"
  );

  let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
  if (usuarioIsEmailExiste) {
    _validationContract.isTrue(
      usuarioIsEmailExiste.nome != undefined,
      `Já existe o email ${req.body.email} cadastrado no banco de dados`
    );
  }
  req.body.senha = md5(req.body.senha);
  ctrlBase.post(_repo, _validationContract, req, res);
};
usuarioController.prototype.put = async (req, res) => {
  let _validationContract = new validation();
  _validationContract.isRequired(req.body.nome, "Informe nome do usuario");
  _validationContract.isRequired(req.params.id, "Informe o id do usuario");

  _validationContract.isRequired(req.body.email, "Informe seu email");
  _validationContract.isEmail(req.body.email, "Email inválido");


  let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
  if (usuarioIsEmailExiste) {
    _validationContract.isTrue(
      usuarioIsEmailExiste.nome != undefined &&
        usuarioIsEmailExiste._id != req.params.id,
      `Já existe o email ${req.body.email} cadastrado no banco de dados`
    );
  }
  ctrlBase.put(_repo, _validationContract, req, res);
};
usuarioController.prototype.get = async (req, res) => {
  console.log(req.usuarioLogado);
  ctrlBase.get(_repo, req, res);
};
usuarioController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res);
};
usuarioController.prototype.getByCoordinate = async (req, res) => {
 let coords = await _repo.getByCoordinate(req.body.coords,req.body.maxDistance);
 res.status(200).send(coords);
}; 

usuarioController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res);
};
usuarioController.prototype.unfollow = async (req,res)=>{
  let _validationContract = new validation();
  _validationContract.isRequired(req.params.id,'o id do post que será atualizado obrigatório');
ctrlBase.unfollow(_repo,_validationContract,req,res);
};
usuarioController.prototype.follow = async (req,res)=>{
  let _validationContract = new validation();
  _validationContract.isRequired(req.params.id,'o id do usuario a ser seguido obrigatório');
ctrlBase.follow(_repo,_validationContract,req,res);
};
usuarioController.prototype.autenticar = async (req, res) => {
  let _validationContract = new validation();
  _validationContract.isRequired(req.body.email, "Informe seu email");
  _validationContract.isEmail(req.body.email, "Email inválido");
  _validationContract.isRequired(req.body.senha, "Senha obrigatória");
  if (!_validationContract.isValid()) {
    res
      .status(400)
      .send({
        message: "Não foi possível efetuar o login",
        validation: _validationContract.errors()
      });
    return; 
}
let usuarioEncontrado = await _repo.authenticate(req.body.email,req.body.senha); 
if(usuarioEncontrado){
    res.status(200).send({
        usuario: usuarioEncontrado,
        token: jwt.sign({user:usuarioEncontrado},variables.Security.secretKey)
    });
}else{
    res.status(404).send({message:'Usuário e senha informados são inválidos'});
}
};

module.exports = usuarioController;
