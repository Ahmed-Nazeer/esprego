
const express=require('express')
const path=require("path")
const mysql = require('mysql'); 
const bodyparser=require('body-parser');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./views/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const port=3000
const main = require("../controller/main");
const router=express.Router();
router.get("/", (req, res) => main.servehome(req, res));
router.get("/home", (req, res) => main.servehome(req, res));
router.get("/contact", (req, res) => main.servecontactus(req, res));
router.get("/about", (req, res) => main.serveaboutus(req, res));
router.get("/team", (req, res) => main.getteam(req, res));
router.get("/team/get", (req, res) => main.getteam(req, res));
router.get("/admin/team/add", (req, res) => main.teamadd(req, res));
router.post("/admin/team/add",upload.single("image"), (req, res) => main.addteam(req, res));
router.get("/admin/team", (req, res) => main.getteamadmin(req, res));
module.exports = router;
