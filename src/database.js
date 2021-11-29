const mysql = require ('mysql');
const { promisify } = require('util') //le permite a node recibir promesas
const { database } = require('./keys');
const pool = mysql.createPool(database); //crea la conexión a la base de datos

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXIÓN CON LA BASE DE DATOS FUE CERRADA');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LAS BASES DE DATOS TIENEN MUCHAS CONEXIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LAS CONEXIÓN FUE RECHAZADA');
        }
        console.error(err);
    }else if(connection) {
        connection.release()
        console.log('BASE DE DATOS CONECTADA');
    }
    return
});

pool.query = promisify(pool.query);//puede utilizar promesas 

module.exports = pool;






