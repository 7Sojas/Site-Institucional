var database = require("../database/config")


function consultarSensoresPropriedade(siloId)
{
    var instrucaoSql = `select sensor.id, sensor.tipo from sensor
                        inner join silos on sensor.fkSilo = silos.id
                        inner join propriedade on silos.fkPropriedade = propriedade.id
                        inner join usuario on propriedade.fkUsuario = usuario.id
                        where silos.id = ${siloId};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function consultarLeituraTemperaturaSensor(idSensor)
{
    var instrucaoSql = `select leituraSensor.id, temperaturaLm as temperatura, DATE_FORMAT(dataHora, '%H:%i') AS dataHora, fkSensor from leituraSensor
                        inner join sensor on leituraSensor.fkSensor = sensor.id
                        where sensor.id = ${idSensor}
                        order by id;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function consultarUmidadeTemperaturaSensor(idSensor)
{
    var instrucaoSql =`select leituraSensor.id, umidadeDht as umidade, DATE_FORMAT(dataHora, '%H:%i') AS dataHora, fkSensor from leituraSensor
                        inner join sensor on leituraSensor.fkSensor = sensor.id
                        where sensor.id = ${idSensor}
                        order by id;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = 
{
    consultarSensoresPropriedade,
    consultarLeituraTemperaturaSensor,
    consultarUmidadeTemperaturaSensor
};