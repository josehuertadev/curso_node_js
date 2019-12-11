//MOCK FALSEAR LA BASE DE DATOS

//const list = [];

//mongodb+srv://db_user_curso_node:vNn5f80H8pC7uQxG@cluster0-zzaqq.mongodb.net/test?retryWrites=true&w=majority
const db = require('mongoose');
const Model = require('./model');

db.Promise = global.Promise;
db.connect(process.env.DB_URL,{
   useNewUrlParser :true
});
console.log('[db] Conectada con exito');

function addMessage(message){
    //list.push(message);
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMesasage(filterUser){
    //return list;
    let filter = {};
    if(filterUser !== null){
        filter = {user : filterUser}
    }
    const messages = await Model.find(filter);
    return messages;
}

async function updateText(id, message){
    console.log(id);
    const foundMessage = await Model.findOne({
        _id: id
    });

    console.log(foundMessage);

    foundMessage.message = message;

    const newMessage = await foundMessage.save();
    return newMessage;
}

function removeMessage(id){
    return Model.deleteOne({
        _id : id
    });
}

module.exports = {
    add : addMessage,
    list : getMesasage,
    updateText : updateText,
    remove : removeMessage
}