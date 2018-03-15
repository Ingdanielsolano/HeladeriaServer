var connection = require('./conexion');
connection.inicia();
var jwt=require('jsonwebtoken');
function Admin() {
    this.login=function (data,response) {
        connection.obtener(function (er,cn) {            
            //console.log("Its here");
            cn.query(`select id from Usuario where username='${data.username}' and pass=Md5('${data.pass}');`,function (error,result) {                
                cn.release();
                if (error) {                    
                    response.send({estado:'Error'});                
                }else{
                    if(result.length==0){
                        response.send(false);
                    }else{                                                
                        var token=jwt.sign({user:data.usuario},'secreto',{expiresIn:'120s'});
                        response.send(token);
                    }
                }
            })
        })        
    }
}
module.exports = new Admin();