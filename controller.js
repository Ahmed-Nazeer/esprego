// var express = require('express');
// var app = express();
// // set the view engine to ejs
// app.set('view engine', 'ejs');
// // use res.render to load up an ejs view file
// // index page
// app.get('/', function(req, res) {
// //   // res.render('page/home');
// //   res.sendFile('page/home');
// });

// app.listen(8080);
// console.log('Server is listening on port 8080');
  

const express=require('express')
const app=express()
const path=require("path")
const mysql = require('mysql'); //both dependencies are present
const port=3000
app.set('view engine', 'ejs');
var connection=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'webproject'
});
connection.connect(function (err){
  if (err) throw err;
  console.log('connected');
})
app.use(express.static(path.join(__dirname,'views')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'views','home.html'))
    
  })
  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname,'views','home.html'))
    
  })
  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'views','about.html'))
    
  })
  app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,'views','contact.html'))
    
  })
  app.get('/routes', (req, res) => {
    var query="select * from customer";
    connection.query(query,(err,row,fields)=>{
      if (err) throw err;
      res.render('page/index',{title:'Customer Record', action:'list',data:row});
    })
    
  })
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

