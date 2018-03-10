var mysql=require('mysql');

function conexion(){
    this.pool=null;
    this.inicia= function(){
        this.pool=mysql.createPool({
         host:'localhost',
         user:'root',
         password:'root',
         database: 'heladeria',
         
        })
    }
    this.obtener= function(callback){
        this.pool.getConnection(function(error,connection){
            callback(error,connection);          
        })
    }
}
module.exports=new conexion();