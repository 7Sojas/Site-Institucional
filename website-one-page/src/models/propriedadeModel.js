var database = require("../database/config");


function cadastrar(logradouro, numero, cep) 
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", logradouro,numero,cep);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO endereco (logradouro,numero,cep) VALUES ('${logradouro}', '${numero}', '${cep}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
