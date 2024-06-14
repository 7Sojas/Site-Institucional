var silosModel = require("../models/silosModel");

function cadastrarSilo(req,res)
{
    var tipo = req.body.tipoServer;
    var temMax = req.body.temperaturaMaxServer;
    var temMin = req.body.temperaturaMinServer;
    var umiMax = req.body.umidadeMaxServer;
    var umiMin = req.body.umidadeMinServer;

    console.log(req.body)


    // Faça as validações dos valores
    if (tipo == undefined) 
    {
        res.status(400).send("Seu tipo está undefined!");
    } 
    else if (temMax == undefined) 
    {
        res.status(400).send("Seu tempMax está undefined!");
    } 
    else if (temMin == undefined) 
    {
        res.status(400).send("Sua temMin está undefined!");
    } 
    else if (umiMax == undefined) 
    {
        res.status(400).send("Seu umiMax está undefined!");
    } 
    else if (umiMin == undefined) 
    {
            res.status(400).send("Seu umiMin está undefined!");
    } 
    else 
    {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        silosModel.cadastrarSilo(tipo, temMax, temMin, umiMax,umiMin)
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
}




module.exports = 
{
    cadastrarSilo
}