var express = require('express');
var app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
  // res.render('page/home');
  res.sendFile('page/home');
});

app.listen(8080);
console.log('Server is listening on port 8080');
  

// const express=require('express')
// const app=express()
// const path=require("path")
// const port=3000
// app.use(express.static(path.join(__dirname,'views')))
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname,'views','home.html'))
    
//   })
//   app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname,'views','home.html'))
    
//   })
//   app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname,'views','about.html'))
    
//   })
//   app.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname,'views','contact.html'))
    
//   })
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })

