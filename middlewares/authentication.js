const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
module.exports = async(req,res,next)=>{
    //let token = req.body.token || req.query.query || req.headers['Authorization'];
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ');
    if(token){
try{
let decoded = await jwt.verify(token,variables.Security.secretKey);
req.usuarioLogado = decoded;
next();
}catch(error){
res.status(401).send({message:'Token informado inválido'});
return;
}
    }else{
        res.status(401).send({message:'Você precisa informar um token para acessar esse recurso.'});
return;
    }
}
