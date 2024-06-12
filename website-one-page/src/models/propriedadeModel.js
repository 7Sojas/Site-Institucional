var database = require("../database/config");


function cadastrar(logradouro, numero, cep, nome,id) 
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarPropriedadeComEndereco():", logradouro, numero, cep, nome,id);
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    // e na ordem de inserção dos dados.
    var inserirEnderecoSql = `
        INSERT INTO endereco (logradouro, numero, cep) VALUES ('${logradouro}', '${numero}', '${cep}');
    `;

    console.log("Executando a instrução SQL para inserir endereço: \n" + inserirEnderecoSql);

    return database.executar(inserirEnderecoSql)
        .then(() => {
            // Query para pegar o último ID inserido
            var pegarUltimoIdSql = `SELECT max(id) FROM endereco;`;
            console.log("Executando a instrução SQL para pegar o último ID inserido: \n" + pegarUltimoIdSql);
            return database.executar(pegarUltimoIdSql);
        })
        .then(result => 
            {
            // Supondo que o resultado da query é um array de objetos e estamos pegando o primeiro objeto
            var enderecoId = result[0]['max(id)'];
            console.log("ID do endereço inserido: " + enderecoId);

            var inserirPropriedadeSql = `
                INSERT INTO propriedade (nome, fkEndereco, fkUsuario) VALUES ('${nome}', '${enderecoId}', '${id}');
            `;
            
            console.log("Executando a instrução SQL para inserir propriedade: \n" + inserirPropriedadeSql);
            return database.executar(inserirPropriedadeSql);
            })
        .then(result => {
            console.log("Propriedade inserida com sucesso.");
            return result;
        })
        .catch(error => {
            console.error("Erro ao executar as instruções SQL: ", error);
            throw error;
        });
}


function buscarPropriedadesPorUsuario(idUsuario) {
    var instrucaoSql = `SELECT * FROM propriedade WHERE fkUsuario = '${idUsuario}'`;
    return database.executar(instrucaoSql);
}


function buscarSilosPorPropriedade(idPropriedade) {
    var instrucaoSql = `
  
    SELECT silos.id, silos.tipo, silos.temperaturaMax, silos.temperaturaMin, silos.fkPropriedade FROM silos
    JOIN propriedade
    on propriedade.id = silos.fkPropriedade
    WHERE silos.fkPropriedade = ${idPropriedade};
  `;
    return database.executar(instrucaoSql);
}


module.exports =
{
    buscarPropriedadesPorUsuario,
    cadastrar,
    buscarSilosPorPropriedade
}
