var connection = require('./conexion');
connection.inicia();

function Pedido() {

    this.InsertaPedido = function (datos, respuesta) {        
        connection.obtener(function (er, cn) {
            console.log(datos);
            cn.query('Call IngresarPedido(?,?,?,?,?,?,?,?,?,?); ', [datos.cedula, datos.direccion, datos.barrio, datos.punto,datos.mil,datos.dosmil,datos.cincomil,datos.diezmil,datos.veintemil,datos.cincuentamil], function (error, resultado) {
                cn.release();
                if (error) {
                    console.log(error);
                    respuesta.send({
                        estado: 'error'
                    });
                } else {
                    respuesta.send({
                        estado: 'ok'
                    });
                }
            })
        })
    }
    this.PedidoForAcept = function (resultado) {
        connection.obtener(function (er, cn) {
            cn.query(`Select p.codigo_pedido, p.Valor_total as total,detalle.codigo_producto as producto, detalle.tamano as tamano, detalle.cantidad as cantidad, Acept as estado,nombre, dir.direccion,detalle.codigo_producto from pedido p inner join detalle_pedido detalle on detalle.codigo_pedido=p.codigo_pedido inner join direccion dir on dir.codigo_direccion=p.direccion join cliente c on c.id_cliente=p.id_cliente order by estado;`, function (error, resultado) {
                cn.release();
                if (error) {
                    return 'error';
                } else {
                    console.log(resultado);
                    return resultado;
                }
            })
        })
    }
    this.IngresarDetallePedido = function (datos, respuesta) {
        connection.obtener(function (er, cn) {
            cn.query('Call IngresarDetallePedido(?,?,?,?,?); ', [datos.codigo_producto, datos.cantidad, datos.precio, datos.tamano, datos.cedula], function (error, resultado) {
                cn.release();
                if (error) {
                    console.log(error);
                    respuesta.send({
                        estado: error
                    });
                } else {
                    respuesta.send({
                        estado: 'ok'
                    });
                }
            })
        })
    };
    this.DetallePedidoInfo = function (datos, respuesta) {
        connection.obtener(function (er, cn) {
            cn.query('Select dp.codigo_pedido,dp.tamano,dp.cantidad,dp.valor_total as total,nombre_producto as nombre from detalle_pedido dp inner join producto p on p.codigo_producto=dp.codigo_producto where dp.codigo_pedido=' + datos.id + ';', function (error, resultado) {
                cn.release();
                if (error) {
                    console.log(error);
                    respuesta.send({
                        estado: error
                    });
                } else {
                    respuesta.send(resultado);
                }
            })
        })
    };

    this.ValidacionCliente = function (datos, respuesta) {
        connection.obtener(function (er, cn) {
            cn.query('Select c.id_cliente from cliente c where c.cedula=' + datos.id + ';', function (error, resultado) {
                cn.release();
                if (error) {
                    respuesta.send({
                        estado: error
                    });
                } else {
                    if (resultado.length == 0) {
                        respuesta.send(false)
                    } else {
                        respuesta.send(true);
                    }
                }
            })
        })
    };
}

module.exports = new Pedido();