const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/',function(req,res){
    //console.log(req.body);
    /*console.log(req.headers);
    res.header({
        'custom-header' : 'Nuetro valor personalizado'
    });
    response.success(req,res,"Lista de mensajes con nodemon");*/
    const filterMessage = req.query.user || null;
    controller.getMessages(filterMessage)
        .then((messageList) => {
            response.success(req,res,messageList,200);
        }).catch(() => {
            response.error(req,res,'Unexpected error',500,"Error interno de servidor");
        });

});

router.post('/',function(req,res){
    controller.addMessage(req.body.user,req.body.message)
        .then((fullMessage) => {
            response.success(req,res,fullMessage,201); 
        }).catch(() => {
            response.error(req,res,'Informacion invalida',400,'Error en el formato de request'); 
        });
    //res.send('Hola mi nombres es ' + req.body.nombre + ' y soy un ' + req.query.profesion);
});

router.patch('/:id',function(req,res){
    controller.updateMessage(req.params.id,req.body.message)
        .then((data) => {
            response.success(req,res,data,200);
        }).catch(e => {
            response.success(req,res,"Error interno",500,e);
        });
});

router.delete('/:id',function(req,res){
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req,res,`Mensaje ${req.params.id} eliminado`,200);
        }).catch(e =>{
            response.error(req,res,'Error interno',500,e);
        });
});

module.exports = router;