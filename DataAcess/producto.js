var connection = require('./conexion');
connection.inicia();

function Producto() {

    //Consultar todos los productos
    this.ConsultarProductos = function (resultado) {
        connection.obtener(function (er, cn) {
            if (cn == null) {
                console.log('no hubo conexion');
            }
            cn.query('call ConsultarProductos()', function (error, respuesta) {                
                cn.release();
                if (error) {
                    resultado.send({
                        estado: 'error'
                    });
                } else {
                    resultado.send(respuesta[0]);
                }
            })
        });
    };
 
    //Consultar unico producto
    this.DetalleProducto = function (data, resultado) {
        connection.obtener(function (er, cn) {
            console.log(data);
            cn.query('call ConsultarDetalleProducto(?)', data.id, function (error, respuesta) {
                cn.release();
                if (error) {
                    resultado.send('error')
                } else {
                    console.log("llego algo");
                    resultado.send(respuesta[0]);
                }
            })
        })
    };

    //Consultar unico cliente
    this.ConsultarCliente = function (data, resultado) {
        connection.obtener(function (er, cn) {
            console.log(data.id);
            cn.query('select * from cliente where cedula=?', data.id, function (error, respuesta) {
                cn.release();
                if (error) {
                    resultado.send({
                        estado: 'error'
                    })
                } else {
                    resultado.send(respuesta)
                }
            })
        })
    };
    this.IngresarClientes = function (datos, respuesta) {
        connection.obtener(function (er, cn) {
            if (cn == null) {
                console.log('no hubo conexion');
            }
            cn.query('insert into cliente values(DEFAULT,?,?,?,\'activo\',?)', [datos.cedula, datos.nombre, datos.apellido,datos.telefono], function (error, resultado) {
                cn.release();
                if (error) {
                    respuesta.send({
                        estado: '' + error
                    });
                } else {
                    respuesta.send({
                        estado: 'ok'
                    });
                }
            })
        })
    };
}

module.exports = new Producto();