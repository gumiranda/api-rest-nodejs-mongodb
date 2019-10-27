'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const chatModel =  new schema({
    userDest: {
        type: ObjectId,
        ref: 'Usuario'
    },
    userRemet: {
        type: ObjectId,
        ref: 'Usuario'
    },
    photo:{type:String,required:true},
    lastMessage:{type:String,required:true},
    nomeUser:{type:String,required:true},
    dataCriacao:{type:Date,default: Date.now},
    messages: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            createdBy: { type: ObjectId, ref: 'Usuario' }
        }
    ],
},{versionKey:false});

chatModel.pre('save',next=>{
    let agora = new Date();
    if(!this.dataCriacao)
        this.dataCriacao = agora;
    next();
});


module.exports = mongoose.model('Chat',chatModel);