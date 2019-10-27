'use strict'

const mongoose = require('mongoose');
const aws = require('aws-sdk');
const s3 = new aws.S3();

const schema = mongoose.Schema;

const photoModel =  new schema({
    name:{type:String},
    size:{type:Number},
    chave:{type:String},
    url:{type:String},
    dataCriacao:{type:Date,default: Date.now}
},{versionKey:false});

photoModel.pre('save',next=>{
    let agora = new Date();
    if(!this.dataCriacao)
        this.dataCriacao = agora;
    
    next();
});



module.exports = mongoose.model('Photo',photoModel);