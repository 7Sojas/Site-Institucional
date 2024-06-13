var database = require("../database/config");


//Cadastrar dados do silo no banco de dados
function cadastrar(logradouro, numero, cep, nome, tempMin, tempMax, umiMin, umiMax) {
    // Primeiro INSERT: insere o endereço
    var instrucaoSql1 = `INSERT INTO endereco (logradouro, numero, cep) VALUES ('${logradouro}', '${numero}', '${cep}');`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql1);

    // Executa o primeiro INSERT e obtém o ID do endereço inserido
    database.executar(instrucaoSql1, function (resultado1) {
        var fkEndereco = resultado1.insertId;  // Obtém o ID do endereço inserido

        // Segundo INSERT: insere a propriedade com o ID do endereço recém-inserido
        var instrucaoSql2 = `INSERT INTO propriedade (nome, proprietario, fkEndereco, fkUsuario) VALUES ('${nome}', 'Ana', ${fkEndereco}, 1);`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);

        // Executa o segundo INSERT
        database.executar(instrucaoSql2, function (resultado2) {
            // Aqui você pode manipular o resultado da segunda inserção, se necessário
            console.log("Propriedade cadastrada com sucesso!");
        });
    });
}

function cadastrar(logradouro, numero, cep) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", logradouro, numero, cep);

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
        .then(result => {
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
    var instrucaoSql = `
    SELECT * FROM propriedade WHERE fkUsuario = ${idUsuario};
    `

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

function buscarSilosAlerta(idSilo) {
    var instrucaoSql = `
    select distinct(si.id) SILO
    from silos si
    inner join sensor s on si.id = s.fkSilo
    inner join alerta a on a.fkSensor = s.id
    where si.id = ${idSilo} and a.id is not null;
    `

    return database.executar(instrucaoSql);

}

function buscarPropriedadeAlerta(idPropriedade) {
    var instrucaoSql = `
    select distinct(prop.id) PROPRIEDADE
    from propriedade prop
    inner join silos si on si.fkPropriedade = prop.id
    inner join sensor s on si.id = s.fkSilo
    inner join alerta a on a.fkSensor = s.id
    where prop.id = ${idPropriedade} and a.id is not null;
    `
    return database.executar(instrucaoSql);
}

function buscarTemperaturaUmidadeSilo(idSilo) {
    var instrucaoSql = `

    select silos.id SILO, IFNULL(ROUND(AVG(umidadeDht)), 0) UMIDADE_MEDIA, IFNULL(ROUND(AVG(temperaturaLm)), 0) TEMPERATURA_MEDIA from leituraSensor
    join sensor on leituraSensor.fkSensor = sensor.id
    join silos on silos.id = sensor.fkSilo 
    where silos.id = ${idSilo};

    `
    return database.executar(instrucaoSql);
}

function buscarPorcentagemSilosAlertaPorPropriedade(idPropriedade) {
    var instrucaoSql = `

    SELECT p.id AS Propriedade,
    CONCAT(ROUND(AVG(CASE WHEN a.id IS NOT NULL THEN 1 ELSE 0 END) * 100,0), '%') AS MediaSilosEmAlerta
    FROM propriedade p
    INNER JOIN silos si ON si.fkPropriedade = p.id
    LEFT JOIN sensor s ON s.fkSilo = si.id
    LEFT JOIN alerta a ON a.fkSensor = s.id
    WHERE p.id = ${idPropriedade}
    GROUP BY p.id;

    `
    return database.executar(instrucaoSql);
}

function contagemSensorPorSilo(idSilo) {
    var instrucaoSql = `

    select count(sen.id) 'QTD_SENSOR'
    from sensor sen
    inner join silos si on si.id = sen.fkSilo
    where si.id = ${idSilo};

    `
    return database.executar(instrucaoSql);
}

function contagemSensorAlertaPorSilo(idSilo) {
    var instrucaoSql = `

    select count(distinct(s.id)) 'SENSOR_ALERTA'
    from sensor s
    inner join silos si on si.id = s.fkSilo
    inner join alerta a on a.fkSensor = s.id
    where si.id = ${idSilo} and a.id is not null;

    `
    return database.executar(instrucaoSql);
}




module.exports =
{
    buscarPropriedadesPorUsuario,
    cadastrar,
    buscarSilosPorPropriedade,
    buscarSilosAlerta,
    buscarPropriedadeAlerta,
    buscarTemperaturaUmidadeSilo,
    buscarPorcentagemSilosAlertaPorPropriedade,
    contagemSensorPorSilo,
    contagemSensorAlertaPorSilo
}
