'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const postModel = require("./post-model");

const usuarioModel =  new schema({
    nome : {trim: true,index:true,required:true,type:String},
    email:{type:String,required:true},
    numSeguidores:{type:Number,default:0},
    numSeguindo:{type:Number,default:0},
    senha:{type:String,required:true},
    followers: [
        { 
        followedBy:{ type: ObjectId, ref: 'Usuario' }
    }
],
    following: [
        {
     followedBy:{ type: ObjectId, ref: 'Usuario' }
    }
],
    resetPasswordLink: {
        data: String,
        default: ""
    },
    role: {
        type: String,
        default: "subscriber"
    },
    image: {
        type: ObjectId,
        ref: 'Photo'
    },
        coords: {type:[Number], index:'2d'},//2dsphere
    dataCriacao:{type:Date,default: Date.now}
},{versionKey:false});

usuarioModel.pre('save',next=>{
    let agora = new Date();
    if(!this.dataCriacao)
        this.dataCriacao = agora;
    next();
});
usuarioModel.pre("remove", function(next) {
    postModel.remove({ postedBy: this._id }).exec();
    next();
});

module.exports = mongoose.model('Usuario',usuarioModel);