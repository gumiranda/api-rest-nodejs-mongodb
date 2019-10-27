'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const schedulingModel = new schema(
  {
    provider: {
      type: ObjectId,
      index:true,
      ref: 'Usuario'
    },
    cliente: {
        type: ObjectId,
        ref: 'Usuario'
      },
    dataInicio: { type: Date, required: true },
    dataFim:{ type: Date, required: true },
    dataCriacao: { type: Date, default: Date.now },
    dataUpdate: { type: Date, default: Date.now },
    dataCancelamento: { type: Date },
  },
  { versionKey: false }
)

schedulingModel.pre('save', next => {
  let agora = new Date()
  if (!this.dataCriacao) this.dataCriacao = agora
  next()
})

module.exports = mongoose.model('Scheduling', schedulingModel)
