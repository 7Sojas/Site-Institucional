var database = require("../database/config");


//Cadastrar dados do silo no banco de dados
function cadastrarSilo(tipo,temperaturaMax,temperaturaMin,umidadeMax,umidadeMin,propriedade)
{
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = 
    `
        INSERT INTO silos (tipo, temperaturaMax, temperaturaMin, umidadeMax, umidadeMin, fkPropriedade) 
        VALUES ('${tipo}', '${temperaturaMax}', '${temperaturaMin}', '${umidadeMax}', '${umidadeMin}', ${propriedade});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}



module.exports = 
{
    cadastrarSilo
}