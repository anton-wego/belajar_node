var http = require('http');
var url = require('url');
var qs = require('querystring');
var db = require("./db");
var port = 8080

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })

  var q = url.parse(req.url, true);
  var id = q.query.id;
  if(q.pathname == "/products" && req.method === "GET"){
    if(id === undefined){
      //list product
      console.log(id);
      let sql = "SELECT * FROM products"
      db.query(sql,(err, result) => {
        if (err){ 
          console.log(err);
          throw err;
        }
        console.log(result);
          
        res.end(JSON.stringify(result));  
      });

    } else if(id > 0) {
      let sql = "SELECT * FROM products where id = "+ id;              
      db.query(sql,(err, result) => {
        if (err) throw err;
        
        var product = result[0];
        res.end(JSON.stringify(product));
      });
    }
      
  } else if(q.pathname == "/products" && req.method === "POST"){
    //save product
    var body = '';
    req.on('data', function (data) {
        body += data;
        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            req.connection.destroy();
    });

    req.on('end', function () {
      var postData = qs.parse(body);
      let name = postData.name;
      let price = postData.price;
      let sql = `insert into products (name, price) values ( '${name}', '${price}' )`
      db.query(sql,(err, result) => {
        if (err) throw err;
            
        if(result.affectedRows == 1){
          res.end(JSON.stringify({message: 'success'}));  
        } else {
          res.end(JSON.stringify({message: 'gagal'}));  
        }
            
      });
    });
  } else if(q.pathname == "/products" && req.method === "PUT"){
    //update product  
    var body = '';
    console.log(req)
    // req.on('data', function (data) {
    //   body += data;
    //   // Too much POST data, kill the connection!
    //   // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    //   if (body.length > 1e6)
    //     req.connection.destroy();
    // });
      
    // req.on('end', function () {      
    //   var postData = qs.parse(body);
    //   let name = postData.name;
    //   let price = postData.price;
    //   let sql = `UPDATE  products set name = '${name}', price = '${price}' where id = ${id}`
    //   db.query(sql,(err, result) => {
    //     if (err) throw err;
          
    //     if(result.affectedRows == 1){
    //       res.end(JSON.stringify({message: 'success'}));  
    //     } else {
    //       res.end(JSON.stringify({message: 'gagal'}));  
    //     }   
    //   });     
    // });
    res.end(JSON.stringify({message: 'success'}));  
  } else if(q.pathname == "/products" && req.method === "DELETE"){
      //delete product    
      let sql = `DELETE FROM products where id = ${id}`
      db.query(sql,(err, result) => {
        if (err) throw err;
          
        if(result.affectedRows == 1){
          res.end(JSON.stringify({message: 'success'}));  
        } else {
          res.end(JSON.stringify({message: 'gagal'}));  
        }
          
      });     
  } else {
    res.end();  
  }
  // res.end()
  
}).listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

// http.createServer(function (req, res) {
//   var q = url.parse(req.url, true);
  
//   var id = q.query.id;
//   res.setHeader('Content-Type', 'application/json');
//   console.log(q)
  
//   if(q.pathname == "/products" && req.method === "GET"){

    
//     if(id !== undefined){
//       //list product
//       let sql = "SELECT * FROM products"
//       db.query(sql,(err, result) => {
//         if (err){ 
//           console.log(err);
//           // throw err;

//         }
//         console.log(result);
          
//         res.end(JSON.stringify(result));  
//       });

//     }else if(id > 0){
//       //get 1 product
//     }
      
//   }
//   else if(q.pathname == "/products" && req.method === "POST"){
//     //save product
    
//   }
//   else if(q.pathname == "/products" && req.method === "PUT"){
//     //update product    
    
//   }
//   else if(q.pathname == "/products" && req.method === "DELETE"){
//     //delete product    
//   }
  
// }).listen(port);
// console.log('server is running on http://localhost:'+ port);