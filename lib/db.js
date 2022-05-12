var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'mudi',
  password:'123456',
  database:'mudi'
});
db.connect();

module.exports=db;