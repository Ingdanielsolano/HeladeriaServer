var server = require('http').Server(app);
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var routes = require('./routes');
var expressjwt = require('express-jwt');
var sockect=require('./Socketss');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(cors());
app.use(expressjwt({
    secret: 'secreto'
})
.unless({
    path: [
        '/productos',
        '/detalleproducto',
        '/cliente',
        '/cliente/Validar/',
        '/cliente/ver/',
        '/pedido',
        '/InfPedido',
        '/login'        
    ]
}));

routes.configurar(app);

var server = app.listen(8080, function () {
    console.log('Escuchando en el puerto', server.address().port);
})