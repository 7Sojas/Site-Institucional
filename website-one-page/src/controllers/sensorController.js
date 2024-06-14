var sensorModel = require("../models/sensorModel");


function consultarSensoresPropriedade(req,res)
{
    var idUsuario = req.params.idUsuario;

    sensorModel.consultarSensoresPropriedade(idUsuario)
    .then(
        function (resultado) 
        {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}


function consultarLeituraTemperaturaSensor(req,res)
{
    var idSensor = req.params.idSensor;

    sensorModel.consultarLeituraTemperaturaSensor(idSensor)
    .then(
        function (resultado) 
        {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function consultarLeituraTemperaturaSensorEmTempoReal(req,res)
{
    var idSensor = req.params.idSensor;

    sensorModel.consultarLeituraTemperaturaSensor(idSensor)
    .then(
        function (resultado) 
        {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}



function consultarUmidadeTemperaturaSensor(req,res)
{

    var idSensor = req.params.idSensor;
    
    sensorModel.consultarUmidadeTemperaturaSensor(idSensor)
    .then(
        function (resultado) 
        {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}



module.exports = 
{
    consultarSensoresPropriedade,
    consultarLeituraTemperaturaSensor,
    consultarUmidadeTemperaturaSensor,
    consultarLeituraTemperaturaSensorEmTempoReal
};