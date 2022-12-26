var mysql = require('mysql');
var db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", //sesuaikan dengan username di laptop km
  password: "1234", //sesuaikan dengan password di laptop km
  database: "belajar_node" //nama database yang kita buat tadi
});
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = db;