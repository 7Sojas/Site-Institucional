var express = require("express");
var router = express.Router();

var propriedadeController = require("../controllers/propriedadeController");

router.get("/:idUsuario/propriedades", propriedadeController.getPropriedadesByUsuario);

router.post("/cadastrar", function (req, res) 
{
    propriedadeController.cadastrar(req,res);
});

router.get("/:idPropriedade/silos", (req, res) => {
    propriedadeController.buscarSilosPorPropriedade(req, res)
})

module.exports = router;
