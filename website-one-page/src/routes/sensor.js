var express = require("express");
var router = express.Router();


var sensorController = require("../controllers/sensorController");

router.get("/consultarSensoresPropriedade/:id", function (req, res) 
{
    sensorController.consultarSensoresPropriedade(req, res);
});

router.get("/consultarLeituraTemperaturaSensor/:idSensor", function (req, res) 
{
    sensorController.consultarLeituraTemperaturaSensor(req, res)
});


router.get("/consultarUmidadeTemperaturaSensor/:idSensor", function (req, res) 
{
    sensorController.consultarUmidadeTemperaturaSensor(req, res)
});

router.get("/consultarLeituraTemperaturaSensorEmTempoReal/:idSensor", function (req, res) 
{
    sensorController.consultarLeituraTemperaturaSensorEmTempoReal(req, res)
});




module.exports = router;