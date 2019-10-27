'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema

const notificationModel =  new schema({
    content:{type:String,required:true},
    userFor: {
        type: ObjectId,
        ref: 'Usuario'
      },
          userBy: {
        type: ObjectId,
        ref: 'Usuario'
      },
    read:{type:Boolean,required:true,default:false},
    dataCriacao:{type:Date,default: Date.now}
},{versionKey:false});

notificationModel.pre('save',next=>{
    let agora = new Date();
    if(!this.dataCriacao)
        this.dataCriacao = agora;
    next();
});


module.exports = mongoose.model('Notification',notificationModel);