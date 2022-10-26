const express=require('express')
var flash = require('connect-flash');
var session = require('express-session')
const app=express()
const path=require("path")
const bodyparser=require('body-parser');
const port=3000
app.set('view engine', 'ejs');
const Routes = require("./routes/routing");
// app.use(session({
// secret:'messagepassing',
// cookie:{maxAge:60000},
// saveUninitialized:false,
// resave:false
// }))
// app.use(flash());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'views')))
app.use("/", Routes);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

