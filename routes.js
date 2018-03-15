var producto = require('./DataAcess/producto');
var admin=require('./DataAcess/admin');
var pedido=require('./DataAcess/pedido');
function http() {
    this.configurar = function (app) {
        app.get('/productos/', function (solicitud, respuesta) {            
            producto.ConsultarProductos(respuesta);
        });
        app.post('/detalleproducto', function (solicitud, respuesta) {            
            producto.DetalleProducto(solicitud.body, respuesta);
        });
        app.post('/cliente/', function (solicitud, respuesta) {
            producto.IngresarClientes(solicitud.body, respuesta);
        });
        app.post('/cliente/Validar/', function (solicitud, respuesta) {
            pedido.ValidacionCliente(solicitud.body, respuesta);
        });
        app.post('/cliente/ver/', function (solicitud, respuesta) {            
            producto.ConsultarCliente(solicitud.body, respuesta);
        });
        app.post('/pedido/', function (solicitud, respuesta) {
            pedido.InsertaPedido(solicitud.body, respuesta);
        });
        app.post('/InfPedido/', function (solicitud, respuesta) {
            pedido.IngresarDetallePedido(solicitud.body, respuesta);
        });
        app.post('/login/', function (solicitud, respuesta) {
            console.log('Hey');
            admin.login(solicitud.body, respuesta);
        });
        app.post('/detallePedido',function (solicitud, respuesta) {
            pedido.DetallePedidoInfo(solicitud.body,respuesta);
        });
    }
}
module.exports = new http();