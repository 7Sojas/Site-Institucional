var database = require("../database/config");


//Cadastrar dados do silo no banco de dados
function cadastrar(logradouro, numero, cep, nome, tempMin, tempMax, umiMin, umiMax) 
{
    // Primeiro INSERT: insere o endereço
    var instrucaoSql1 = `INSERT INTO endereco (logradouro, numero, cep) VALUES ('${logradouro}', '${numero}', '${cep}');`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql1);

    // Executa o primeiro INSERT e obtém o ID do endereço inserido
    database.executar(instrucaoSql1, function (resultado1) 
    {
        var fkEndereco = resultado1.insertId;  // Obtém o ID do endereço inserido

        // Segundo INSERT: insere a propriedade com o ID do endereço recém-inserido
        var instrucaoSql2 = `INSERT INTO propriedade (nome, proprietario, fkEndereco, fkUsuario) VALUES ('${nome}', 'Ana', ${fkEndereco}, 1);`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);

        // Executa o segundo INSERT
        database.executar(instrucaoSql2, function (resultado2) 
        {
            // Aqui você pode manipular o resultado da segunda inserção, se necessário
            console.log("Propriedade cadastrada com sucesso!");
        });
    });
}


function buscarPropriedadesPorUsuario(idUsuario) 
{
  var instrucaoSql = `SELECT * FROM propriedade WHERE fkUsuario = '${idUsuario}'`;
  return database.executar(instrucaoSql);
}


module.exports = 
{
    buscarPropriedadesPorUsuario,
    cadastrar
}
