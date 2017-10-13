var mysql=require('mysql');

function conexion(){
    this.pool=null;
    this.inicia= function(){
        this.pool=mysql.createPool({
         host:'104.131.33.226',
         user:'munar',
         password:'munar117asd',
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