/**Importar modulos */
// Mongo DB user : db_user_curso_node
// Mongo db pass : vNn5f80H8pC7uQxG
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
/**Nos permite separar las peticiones (Cabeceras,querys, etc) */

//const router = require('./components/messages/network');
const router = require('./network/routes');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
//app.use(router);

router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('La aplicacion esta escuchando en http://localhost:3000');