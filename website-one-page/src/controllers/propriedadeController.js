var propriedadeModel = require("../models/propriedadeModel");


function cadastrar(req,res)
{
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var cep = req.body.cepServer;
    var nome = req.body.nomeServer;
    var id = req.body.userIdServer;

    console.log(req.body)


    // Faça as validações dos valores
    if (logradouro == undefined) 
    {
        res.status(400).send("Seu logradouro está undefined!");
    } 
    else if (numero == undefined) 
    {
        res.status(400).send("Seu numero está undefined!");
    } 
    else if (cep == undefined) 
    {
        res.status(400).send("Seu cep está undefined!");
    } 
    else if (nome == undefined) 
    {
        res.status(400).send("Seu nome está undefined!");
    } 
    else if (id == undefined) 
    {
        res.status(400).send("Seu id está undefined!");
    } 
    else 
    {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        propriedadeModel.cadastrar(logradouro, numero, cep,nome,id)
            .then
            (
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

function getPropriedadesByUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  propriedadeModel.buscarPropriedadesPorUsuario(idUsuario)
    .then(resultado => {
      res.status(200).json(resultado);
    })
    .catch(erro => {
      console.log(erro);
      res.status(500).json(erro);
    });
}

function buscarSilosPorPropriedade(req, res) {
    var idPropriedade = req.params.idPropriedade;
  
    propriedadeModel.buscarSilosPorPropriedade(idPropriedade)
      .then(resultado => {
        res.status(200).json(resultado);
      })
      .catch(erro => {
        console.log(erro);
        res.status(500).json(erro);
      });
  }


module.exports = 
{
    getPropriedadesByUsuario,
    cadastrar,
    buscarSilosPorPropriedade
}
