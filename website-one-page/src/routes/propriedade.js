var express = require("express");
var router = express.Router();

var propriedadeController = require("../controllers/propriedadeController");
router.get("/:idUsuario/propriedades", propriedadeController.getPropriedadesByUsuario);

router.post("/cadastrar", function (req, res) 
{
    propriedadeController.cadastrar(req,res);
});


module.exports = router;
