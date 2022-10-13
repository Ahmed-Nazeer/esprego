
  

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
      res.render('page/index',{title:'Record', action:'list',data:row});
    })
  })

  app.get('/form', (req, res) => {
    res.render('page/send')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

