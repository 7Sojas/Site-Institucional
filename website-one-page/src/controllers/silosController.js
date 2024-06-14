var silosModel = require("../models/silosModel");

function cadastrarSilo(req,res)
{
    var tipo = req.body.tipoServer;
    var temperaturaMax = req.body.temperaturaMaxServer;
    var temperaturaMin = req.body.temperaturaMinServer;
    var umidadeMax = req.body.umidadeMaxServer;
    var umidadeMin = req.body.umidadeMinServer;
    var propriedade = req.body.propriedadeIdServer;

    console.log(req.body)


    // Faça as validações dos valores
    if (tipo == undefined) 
    {
        res.status(400).send("Seu tipo está undefined!");
    } 
    else if (propriedade == undefined) 
    {
        res.status(400).send("Seu propriedade está undefined!");
    } 
    else if (temperaturaMax == undefined) 
    {
        res.status(400).send("Seu tempMax está undefined!");
    } 
    else if (temperaturaMin == undefined) 
    {
        res.status(400).send("Sua temMin está undefined!");
    } 
    else if (umidadeMax == undefined) 
    {
        res.status(400).send("Seu umiMax está undefined!");
    } 
    else if (umidadeMin == undefined) 
    {
            res.status(400).send("Seu umiMin está undefined!");
    } 
    else 
    {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        silosModel.cadastrarSilo(tipo,temperaturaMax,temperaturaMin,umidadeMax,umidadeMin,propriedade)
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