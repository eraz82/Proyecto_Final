const mysql = require('mysql')
const conexion = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'hospital'
})

conexion.connect(function(error) {
if(error){
console.log('Ocurrio un error en la base de datos' + error);
return;
} else{
console.log('Conexion exitosa!')
}
})

module.exports = {conexion}