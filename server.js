'use strict'

const app = require('./bin/express');
const variables = require('./bin/configuration/variables');
let port = process.env.PORT || 3333;
app.listen(port,()=>{
    console.info('Servidor rodando na porta'+port);
});
let pessoas = [];
