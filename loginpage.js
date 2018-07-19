var express = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path');
var bodyParser  =   require("body-parser");
var server = require('http').createServer(app);

function getMYSQLConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "amma123",
    database: "userlogin"
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('htmlfiles'));
app.set('view engine','ejs')

app.use(express.static('Webpage'));
app.get('/first', function (req, res) {
   res.sendFile( __dirname + "/" + "new.html" );
})
app.use(express.static(__dirname));
app.get('/loginpage', function (req, res) {
   res.sendFile( __dirname + "/" + "new.html" );
})
app.get('/database', function (req, res) {



   var connection = getMYSQLConnection();
   connection.connect();
   var username = req.query.username;
   var password = req.query.password;

   connection.query('SELECT * FROM raghs WHERE username = ?',[username], function (error, results, fields) {
   if (error) {
     res.send({
       "code":400,
       "failed":"error ocurred"
     })
   }else{
     if(results.length >0){
       if(results[0].password == password){
         res.send({
           "code":200,
           "success":"login sucessfull"
		
             });
       }
       else{
         res.send({
           "code":204,
           "success":"username and password does not match"
             });

       }
     }
     else{
       res.send({
         "code":204,
         "success":"username does not exits"
           });
     }
   }
   });
});
app.get('/createuser', function(req,res){
    res.sendFile(__dirname+ "/" + "signupform.html");
})
app.post('/adduser', function(req,res){
    var response ={
                    username:req.body.username,
                    password:req.body.password
                    };
    console.log(response.name);
    con.query("INSERT INTO raghs (username,password) VALUES ('"+response.username+"','"+response.password+"')", function(error,result,fields){
        if(error){
            res.send({
                                "code":400,
                                "failed":"error ocurred"
                            });
                }
        else {
            console.log("Successfully Registered");
             res.redirect('/first');
            
            }
    });
});
var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})

