const mysql = require('mysql'); 
const bodyparser=require('body-parser');
//data base connection
var connection=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'webproject'
});
//connection checker
connection.connect(function (err){
    if (err) throw err;
    console.log('connected');
  })
exports.servehome = (req, res) => {
      res.render("../views/page/home")
  };
  exports.servecontactus = (req, res) => {
    res.render("../views/page/contact")
};
exports.serveaboutus = (req, res) => {
    res.render("../views/page/about")
};

//getting all customers
exports.getcustomer = (req, res) => {
    var query="select * from customer";
    connection.query(query,(err,row,fields)=>{
      if (err) throw err;
      res.render('page/index',{title:'Record', action:'list',data:row});
    })
};

//displaying teams page
exports.getteam = (req, res)=>{
    var query="select * from teamdetails";
    connection.query(query,(err,row,fields)=>{
      if (err) throw err;
      res.render('page/ourteam',{action:'list',data:row});
    })
    }

//displaying form for adding new team member
exports.teamadd= (req, res) => {
      res.render('page/addteam');
};

//adding new team member
exports.addteam = (req, res) => {
    // if (!req.file) {
    //     console.log("No file received");
    //     return res.send({
    //       success: false,
    //     });
    //   } else {
    //     console.log("file received");
    //   }
    var fname=req.body.firstname;
      var lname=req.body.lastname;
      var email1=req.body.email;
      var cnic1=req.body.cnic;
      var pos1=req.body.pos;
      var img=req.file.originalname;
        var addingdataquery="INSERT INTO teamdetails(workerfname,wrokerlname,workerpos,email,cnic,imgpath) VALUES ('"+fname+"','"+lname+"','"+pos1+"','"+email1+"','"+cnic1+"','"+img+"')";
        connection.query(addingdataquery,(err)=>{
          if (err) throw err;
          res.redirect("/admin/team");
        })
};
exports.getteamadmin = (req, res)=>{
  var query="select * from teamdetails";
  connection.query(query,(err,row,fields)=>{
    if (err) throw err;
    res.render('page/adminteam',{action:'list',data:row});
  })
  }
