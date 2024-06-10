var express = require("express");
var router = express.Router();

var silosController = require("../controllers/silosController");


router.post("/cadastrarSilo", function (req, res) 
{
    silosController.cadastrarSilo(req, res);
});


module.exports = router;