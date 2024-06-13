var express = require("express");
var router = express.Router();

var propriedadeController = require("../controllers/propriedadeController");

router.get("/:idUsuario/propriedades", propriedadeController.getPropriedadesByUsuario);

router.post("/cadastrar", function (req, res) {
    propriedadeController.cadastrar(req, res);
});

router.get("/:idPropriedade/silos", (req, res) => {
    propriedadeController.buscarSilosPorPropriedade(req, res)
})


router.get("/:idSilo/alertas", (req, res) => {
    propriedadeController.buscarSilosAlerta(req, res)
})

router.get("/:idPropriedade/alerta", (req, res) => {
    propriedadeController.buscarPropriedadeAlerta(req, res)
})

router.get("/:idPropriedade/alerta", (req, res) => {
    propriedadeController.buscarPropriedadeAlerta(req, res)
})

router.get("/:idSilo/temperaturaUmidade", (req, res) => {
    propriedadeController.buscarTemperaturaUmidadeSilo(req, res)
})

router.get("/:idPropriedade/porcentagemSilo", (req, res) => {
    propriedadeController.buscarPorcentagemSilosAlertaPorPropriedade(req, res)
})

router.get("/:idSilo/sensor", (req, res) => {
    propriedadeController.contagemSensorPorSilo(req, res)
})

router.get("/:idSilo/sensor/alerta", (req, res) => {
    propriedadeController.contagemSensorAlertaPorSilo(req, res)
})


module.exports = router;
