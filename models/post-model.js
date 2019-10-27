'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const postModel = new schema(
  {
    image: {
      type: ObjectId,
      ref: 'Photo'
    },
    conteudo: { type: String, required: true },
    curso: { type: String, required: true },
    dificuldadeMateria: { type: String, required: true },
    dificuldadeProfessor: { type: String, required: true },
    faculdade: { type: String, required: true },
    materia: { trim: true, index: true, type: String, required: true },
    numComentarios: { type: Number, required: true },
    numLikes: { type: Number, default:0 },
    professor: { type: String, required: true },
    ativa: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now },
    postedBy: {
      type: ObjectId,
      ref: 'Usuario'
    },
    updated: Date,
    likes: [
      {
        likedBy: { type: ObjectId, ref: 'Usuario' }
      }
    ],
    comments: [
      {
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: ObjectId, ref: 'Usuario' }
      }
    ],
    coords: { type: [Number], index: '2d' } // 2dsphere
  },
  { versionKey: false }
)

postModel.pre('save', next => {
  let agora = new Date()
  if (!this.dataCriacao) this.dataCriacao = agora
  next()
})

module.exports = mongoose.model('Post', postModel)
