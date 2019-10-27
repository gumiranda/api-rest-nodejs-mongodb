
exports.post = async(repository,validationContract,req,res)=>{
try{
let data = req.body;
if(!validationContract.isValid()){
    res.status(400).send({
        message: 'Existem dados inválidos na sua requisição',
        validation: validationContract.errors()
    }).end();
    return;
}
let resultado = await repository.create(data);
res.status(201).send(resultado);

}catch(erro){
console.log('Post com erro, motivo: ',erro);
res.status(500).send({message:'Erro no processamento',error:erro});
}
};
exports.postPhoto = async(repository,validationContract,req,res)=>{
    try{

    let file = req.file;
    console.log(file);
    const {teste} = req.body;
    
    let resultado = await repository.createPhoto(file,teste);
    res.status(201).send(resultado);
    
    }catch(erro){
    console.log('Post com erro, motivo: ',erro);
    res.status(500).send({message:'Erro no processamento',error:erro});
    }
    };
exports.put = async(repository,validationContract,req,res)=>{
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        let resultado = await repository.update(req.params.id,data);
        res.status(202).send(resultado);
        
        }catch(erro){
        console.log('Put com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.uncomment = async(repository,validationContract,req,res)=>{
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        
        let resultado = await repository.uncomment(req.params.id,data);
        res.status(202).send(resultado);
        
        }catch(erro){
        console.log('Put com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.deleteMessage = async(repository,validationContract,req,res)=>{
    try{
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        let resultado = await repository.deleteMessage(req.params.id,req.params.id2);
        res.status(202).send({message:'Mensagem excluida com sucesso'});
        
        }catch(erro){
        console.log('Put com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.comment = async(repository,validationContract,req,res)=>{
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        
        let resultado = await repository.comment(req.params.id,data);
        res.status(202).send(resultado);
        
        }catch(erro){
        console.log('Put com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.sendMessage = async(repository,validationContract,req,res)=>{
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        
        
        let resultado = await repository.sendMessage(req.params.id,data,req.usuarioLogado.user);
        res.status(202).send(resultado);
        
        }catch(erro){
        console.log('Envio de mensagem com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.unfollow = async(repository,validationContract,req,res)=>{
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        
        let resultado = await repository.unfollow(req.params.id,req.usuarioLogado);
        res.status(202).send(resultado);
        
        }catch(erro){
        console.log('Put com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.follow = async(repository,validationContract,req,res)=>{
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        let resultado = await repository.follow(req.params.id,req.usuarioLogado);
        res.status(202).send(resultado);
        
        }catch(erro){
        console.log('Put com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.unlike = async(repository,validationContract,req,res)=>{
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        
        let resultado = await repository.unlike(req.params.id,data);
        res.status(202).send(resultado);
        
        }catch(erro){
        console.log('Put com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.like = async(repository,validationContract,req,res)=>{
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        
        let resultado = await repository.like(req.params.id,data);
        res.status(202).send(resultado);
        
        }catch(erro){
        console.log('Put com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};

exports.get = async(repository,req,res)=>{
    try{
        let resultado = await repository.getAll();
        res.status(200).send(resultado);
        
        }catch(erro){
        console.log('get com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.getByPage = async(repository,req,res)=>{
    try{
        let page = req.params.page;
        let lat = req.params.lat;
        let lng = req.params.lng;
        let maxDist = req.params.maxdist;
        let coords = [lat,lng];
        let resultado = await repository.getAllByPage(page,coords,maxDist);
        res.status(200).send(resultado);
        
        }catch(erro){
        console.log('get com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.getByPageWithoutGeo = async(repository,req,res)=>{
    try{
        let page = req.params.page;
        let resultado = await repository.getAllByPageWithoutGeo(page);
        res.status(200).send(resultado);
        
        }catch(erro){
        console.log('get com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.getById = async(repository,req,res)=>{
    try{
        let id = req.params.id;
        if(id){
            let resultado = await repository.getById(id);
            res.status(200).send(resultado);
        } else{
res.status(400).send({ message: 'O parametro Id precisa ser informado'});
        }
        }catch(erro){
        console.log('get com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.delete = async(repository,req,res)=>{
    try{
        let id = req.params.id;
        if(id){
            let resultado = await repository.delete(id);
            res.status(200).send({message:'Registro excluido com sucesso'});
        } else{
res.status(400).send({ message: 'O parametro Id precisa ser informado'});
        }
        
        }catch(erro){
        console.log('get com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};
exports.deletePhoto = async(repository,req,res)=>{
    try{
        let id = req.params.id;
        if(id){
            let resultado = await repository.deletePhoto(id);
            res.status(200).send({message:'Registro excluido com sucesso'});
        } else{
res.status(400).send({ message: 'O parametro Id precisa ser informado'});
        }
        
        }catch(erro){
        console.log('get com erro, motivo: ',erro);
        res.status(500).send({message:'Erro no processamento',error:erro});
        }
};