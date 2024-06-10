var database = require("../database/config");


//Cadastrar dados do silo no banco de dados
function cadastrar(logradouro,numero,cep,nome)
{
    
    var instrucaoSql1 = `INSERT INTO endereco(logradouro,numero,cep) VALUES ('${logradouro}','${numero}','${cep}')`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql1);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql2 = 
    `
        INSERT INTO propriedade(nome,proprietario,fkEndereco,fkUsuario) VALUES ('${nome},'Ana',2,1);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql2);
    return database.executar(instrucaoSql2,instrucaoSql1);
}

function buscarPropriedadesPorUsuario(idUsuario) {
  var instrucaoSql = `SELECT * FROM propriedade WHERE fkUsuario = '${idUsuario}'`;
  return database.executar(instrucaoSql);
}


module.exports = 
{
    buscarPropriedadesPorUsuario,
    cadastrar
}
