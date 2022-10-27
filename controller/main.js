const mysql = require('mysql'); 

const bodyparser=require('body-parser');
const pdf =require("html-pdf");
const fs=require("fs");
const { request } = require('http');
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
    const resultsPerPage = 9;
  let sql = 'SELECT * FROM teamdetails';
  connection.query(sql, (err, result) => {
      if(err) throw err;
      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if(page > numberOfPages){
          res.redirect('/?page='+encodeURIComponent(numberOfPages));
      }
      //Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      //Get the relevant number of POSTS for this starting page
      sql = `SELECT * FROM teamdetails LIMIT ${startingLimit},${resultsPerPage}`;
      connection.query(sql, (err, result)=>{
          if(err) throw err;
          let iterator = (page - 1) < 1 ? 1 : page - 1;
          let endingLink = (iterator + 3) <= numberOfPages ? (iterator + 3) : page + (numberOfPages - page);
          if(endingLink < (page + 0)){
              iterator -= (page + 0) - numberOfPages;
          }
          res.render('page/ourteam', {data: result, page, iterator, endingLink, numberOfPages});
      });
  });
    }

//displaying teams after search
exports.getsearchteam = (req, res)=>{
  it=0;
    var min=0;
    var year=req.query.year;
    var sname=req.query.sname;
    var sql=`SELECT * FROM teamdetails where  workerfname LIKE '%${sname}%' and workerexperience BETWEEN '${min}' and '${year}'`;
    connection.query(sql,(err,result)=>{
      if (err) throw err
      if( result.length > 0){
        res.render('page/oursearchteam',{data:result,it})
      }
      it=100;
 res.render('page/oursearchteam',{data:result,it})
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
      var deg=req.body.deg;
      var phn=req.body.phn;
      var exp=req.body.exp;
      var level=req.body.level;
      var desc=req.body.desc;
      var fax=req.body.fax;
      var img=req.file.originalname;
        var addingdataquery="INSERT INTO teamdetails(workerfname,wrokerlname,workerpos,email,cnic,imgpath,workerdegree,workerphone,workerexperience,workercareerlevel,workerdesc,workerfax) VALUES ('"+fname+"','"+lname+"','"+pos1+"','"+email1+"','"+cnic1+"','"+img+"','"+deg+"','"+phn+"','"+exp+"','"+level+"','"+desc+"','"+fax+"')";
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
//   //displaying form to update  team member
// exports.teamadd= (req, res) => {
//   res.render('page/updateteam');
// };

//showing team member data in form
exports.updateteam = (req, res) => {
  
  var id=req.query.id;
  var tempquery="SELECT * FROM `teamdetails` WHERE `workerid` = ?";
  connection.query(tempquery,[id],(err, row) => {
      if (!err) {
        res.render("page/updateteam",{data:row})
      } else console.log(err);
    }
  );
};

//updating team member data in form
exports.updateteampost=(req,res)=>{
  if(req.file){
    var fname=req.body.firstname;
var lname=req.body.lastname;
var email=req.body.email;
var cnic=req.body.cnic;
var pos=req.body.pos;
var img=req.file.originalname;
var idd=req.body.updateid;
var deg=req.body.deg;
var phn=req.body.phn;
var exp=req.body.exp;
var level=req.body.level;
var desc=req.body.desc;
var fax=req.body.fax;
var query="update teamdetails set workerfname=?,wrokerlname=?,email=?,cnic=?,workerpos=?,imgpath=?,workerdegree=?,workerphone=?,workerexperience=?,workercareerlevel=?,workerdesc=?,workerfax=? where workerid=?";
var data=[fname,lname,email,cnic,pos,img,deg,phn,exp,level,desc,fax,idd];
  }
  else{
var fname=req.body.firstname;
var lname=req.body.lastname;
var email=req.body.email;
var cnic=req.body.cnic;
var pos=req.body.pos;
var idd=req.body.updateid;
var deg=req.body.deg;
var phn=req.body.phn;
var exp=req.body.exp;
var level=req.body.level;
var desc=req.body.desc;
var fax=req.body.fax;
var query="update teamdetails set workerfname=?,wrokerlname=?,email=?,cnic=?,workerpos=?,workerdegree=?,workerphone=?,workerexperience=?,workercareerlevel=?,workerdesc=?,workerfax=? where workerid=?";
var data=[fname,lname,email,cnic,pos,deg,phn,exp,level,desc,fax,idd];
  }

connection.query(query,data,(err)=>{
  if(!err){
    res.redirect("/admin/team");
  }
  console.log("error in update");
})

};


//del team member data
exports.delteam = (req, res) => {
  var tempquery="DELETE FROM `teamdetails` WHERE `workerid` = " + req.params.id;
  connection.query(tempquery,(err, row, fields) => {
      if (!err) {
          res.redirect("/admin/team");
      } else console.log(err);
    }
  );
};

exports.getproductadmin = (req, res)=>{
  var query="select * from productdetails";
  connection.query(query,(err,row,fields)=>{
    if (err) throw err;
    res.render('page/adminproduct',{action:'list',data:row});
  })
  }

  //del product data
exports.delproduct = (req, res) => {
  var tempquery="DELETE FROM `productdetails` WHERE `prodid` = " + req.params.id;
  connection.query(tempquery,(err, row, fields) => {
      if (!err) {
          res.redirect("/admin/product");
      } else console.log(err);
    }
  );
};

//displaying form for adding new product
exports.productadd= (req, res) => {
  res.render('page/addproduct');
};

//adding new product
exports.addproduct= (req, res) => {
  var pname=req.body.prodname;
    var bname=req.body.brandname;
    var quan=req.body.quantity;
    var desc=req.body.desc;
    var price=req.body.price;
    var wrant=req.body.wrant;
    var img=req.file.originalname;
      var addingdataquery="INSERT INTO productdetails(prodname,prodbrandname,prodinstock,proddesc,prodimg,prodprice,prodwrant) VALUES ('"+pname+"','"+bname+"','"+quan+"','"+desc+"','"+img+"','"+price+"','"+wrant+"')";
      connection.query(addingdataquery,(err)=>{
        if (err) throw err;
        res.redirect("/admin/product");
      })
};


//showing product data in form
exports.updateproduct = (req, res) => {
  var id=req.query.id;
  var tempquery="SELECT * FROM `productdetails` WHERE `prodid` = ?";
  connection.query(tempquery,[id],(err, row) => {
      if (!err) {
        res.render("page/updateproduct",{data:row})
      } else console.log(err);
    }
  );
};

//updating product data in form
exports.updateproductpost=(req,res)=>{
  if(req.file){
    var id=req.body.id;
    var pname=req.body.prodname;
    var bname=req.body.brandname;
    var quan=req.body.quantity;
    var desc=req.body.desc;
    var price=req.body.price;
    var wrant=req.body.wrant;
    var img=req.file.originalname;
var query="update productdetails set prodname=?,prodbrandname=?,prodinstock=?,proddesc=?,prodimg=?,prodprice=?,prodwrant=? where prodid=?";
var data=[pname,bname,quan,desc,img,price,wrant,id];
  }
  else{
    var id=req.body.id;
    var pname=req.body.prodname;
    var bname=req.body.brandname;
    var quan=req.body.quantity;
    var desc=req.body.desc;
    var price=req.body.price;
    var wrant=req.body.wrant;
var query="update productdetails set prodname=?,prodbrandname=?,prodinstock=?,proddesc=?,prodprice=?,prodwrant=? where prodid=?";
var data=[pname,bname,quan,desc,price,wrant,id];
  }

connection.query(query,data,(err)=>{
  if(!err){
    res.redirect("/admin/product");
  }
  else{
  console.log("error in update");
  }
})

};

//displaying product page
exports.getproduct = (req, res)=>{
  const resultsPerPage = 9;
  let sql = 'SELECT * FROM productdetails';
  connection.query(sql, (err, result) => {
      if(err) throw err;
      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if(page > numberOfPages){
          res.redirect('/?page='+encodeURIComponent(numberOfPages));
      }
      //Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      //Get the relevant number of POSTS for this starting page
      sql = `SELECT * FROM productdetails LIMIT ${startingLimit},${resultsPerPage}`;
      connection.query(sql, (err, result)=>{
          if(err) throw err;
          let iterator = (page - 1) < 1 ? 1 : page - 1;
          let endingLink = (iterator + 3) <= numberOfPages ? (iterator + 3) : page + (numberOfPages - page);
          if(endingLink < (page + 0)){
              iterator -= (page + 0) - numberOfPages;
          }
      
          res.render('page/ourproduct', {data: result, page, iterator, endingLink, numberOfPages});
      });
  });
    
  }

//   displaying teams after search
// exports.searchproduct = (req, res)=>{
//   var it=0;
//     var pname=req.query.pname;
//     var sql="SELECT * FROM productdetails where prodname LIKE '%"+pname+"%'";
//     connection.query(sql,(err,result)=>{
//       if (err) throw err
//       if( result.length > 0){
//         res.render('page/oursearchproduct',{data:result,it})
//       }
//       it=100;
//  res.render('page/oursearchproduct',{data:result,it})
//     })
// }

exports.filterproduct = (req, res)=>{
  it=0;
    var min=req.query.min;
    var max=req.query.max;
    var pname=req.query.pname;
    console.log(min,max);
    var sql=`SELECT * FROM productdetails where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}'`;
    connection.query(sql,(err,result)=>{
      if (err) throw err
      if( result.length > 0){
        res.render('page/oursearchproduct',{data:result,it})
      }
      it=100;
 res.render('page/oursearchproduct',{data:result,it})
    })
}


exports.getteamdetail = (req, res)=>{
  var tempquery="SELECT  * FROM `teamdetails` WHERE `workerid` = " + req.params.id;
  connection.query(tempquery,(err, row, fields) => {
      if (!err) {
          res.render("page/memberdetails",{data:row});
      } else console.log(err);
    }
  );
  }


exports.getproductdetail = (req, res)=>{
  var tempquery="SELECT  * FROM `productdetails` WHERE `prodid` = " + req.params.id;
  connection.query(tempquery,(err, row, fields) => {
      if (!err) {
          res.render("page/productdetails",{data:row});
      } else console.log(err);
    }
  );
  }
