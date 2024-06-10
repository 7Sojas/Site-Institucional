var database = require("../database/config");


//Cadastrar dados do silo no banco de dados
function cadastrarSilo(tipo,temperaturaMax,temperaturaMin,umidadeMax,umidadeMin)
{
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = 
    `
        INSERT INTO silos (tipo, temperaturaMin, temperaturaMax, umidadeMaxima, umidadeMinima, fkPropriedade) VALUES ('${tipo}', '${temperaturaMax}', '${temperaturaMin}', '${umidadeMax}',${umidadeMin}, 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = 
{
    cadastrarSilo
}