var pedido = require('./DataAcess/pedido');
var connection = require('./DataAcess/conexion');

function startSockets() {
    var io = require('socket.io').listen(8081);
    var listPedidos;
    io.on('connection', function (socket) {
        socket.on('PullOrder', function (data) {
            TakeData();
        })
        socket.on('ChangeState', (data) => {
            connection.obtener((er, cn) => {
                console.log("changing " + data.codigo_pedido+" tiempo "+data.tiempo);
                cn.query(`call CambiarEstadoPedido(${data.codigo_pedido},'${data.tiempo}');`, function (error, resultado) {
                    cn.release();
                    if (!error) {
                        io.sockets.emit('StateChaged')
                    }else{
                        console.log(error);
                    }
                })
            })
        })
        socket.on('new', function (data) {
            TakeData();
        })
        socket.on('FinishOrder', function (data) {
            connection.inicia();
            connection.obtener(function (er, cn) {
                cn.query(`Update pedido set estado='inactivo' where codigo_pedido=${data};`, function (error, resultado) {
                    cn.release();
                    if (!error) {
                        TakeData();
                    }
                })
            })
        })
        socket.on('OrderClient', function (data) {
            TakeDataClient(data);
        })
        socket.on('DetailOrderData', function (data) {
            connection.inicia();
            connection.obtener(function (er, cn) {
                console.log(data);
                cn.query(`Select * from detalle_pedido dp where dp.codigo_pedido=${data}`, function (error, resultado) {
                    cn.release();
                    if (!error) {
                        console.log(resultado);
                        io.sockets.emit('DeailOrderClient', resultado);
                    }
                })
            })
        })
        function TakeData() {
            connection.inicia();
            connection.obtener(function (er, cn) {
                cn.query(`Select p.codigo_pedido, p.Valor_total as total, Acept as estado,nombre, 
                dir.barrio,p.estado as estadogrande,p.tiempo from pedido p inner join direccion dir on dir.codigo_direccion=p.direccion 
                join cliente c on c.id_cliente=p.id_cliente;`, function (error, resultado) {
                    cn.release();
                    if (!error) {
                        io.sockets.emit('OrderForAcept', resultado);
                    }
                })
            })
        };

        function TakeDataClient(id) {
            connection.inicia();
            connection.obtener(function (er, cn) {
                cn.query(`Select p.codigo_pedido, p.Valor_total as total, Acept as estado,nombre, 
                dir.barrio,p.estado as estadogrande from pedido p inner join direccion dir on dir.codigo_direccion=p.direccion 
                join cliente c on c.id_cliente=p.id_cliente where c.cedula=${id};`, function (error, resultado) {
                    cn.release();
                    if (!error) {
                        io.sockets.emit('PersonalOrders', resultado);
                    }
                })
            })
        };
    })
}


module.exports = new startSockets();