/***************************************************************************************************
 * Objetivo: este arquivo é responsável por guardar todas as funções que manipularam o array da api.
 * Data: 16/09/2025.
 * Autor: Leonardo Scotti.
 * Versão: 1.0
 **************************************************************************************************/

const { userInfo } = require('os');
const dados = require('./estados_cidades.js')
const listaDeEstados = dados.listaDeEstados;

const MESSAGE_ERROR = {
    "status": false,
    "statuscode": 500,
    "developer": "Leonardo Scotti Tobias"
}

//Função que retorna a lista de estados
const getAllEstados = () => {
    //Padrão do JSON que será o retorno da função
    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias",
        "uf": []
    };

    listaDeEstados.estados.forEach((estado) => {
        message.uf.push(estado.sigla);
    });

    //Adiciona um novo elemento ao JSON
    message.quantidade = message.uf.length;

    //Apaga um elemento no JSON
    //delete message.status;

    if (message.uf.length > 0)
        return message;       //Resultado verdadeiro da API 200
    else
        return MESSAGE_ERROR; //Resltado falso da API 500
};

//Função que retorna um estado pela sigla
const getEstadoByUf = (uf) => {
    let sigla = String(uf).toUpperCase();

    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias",
    };

    let estados = listaDeEstados.estados;
    let estadoBySigla = estados.find(estado => estado.sigla === sigla)

    if (estadoBySigla) {
        message.uf = sigla;
        message.descricao = estadoBySigla.nome;
        message.capital = estadoBySigla.capital;
        message.regiao = estadoBySigla.regiao;

        return message;
    } else {
        return MESSAGE_ERROR;
    }
};

//Função que retorna uma capital pela sigla do estado
const getCapitalByUf = (uf) => {
    let sigla = String(uf).toUpperCase();

    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias"
    };

    let estados = listaDeEstados.estados;
    let capitalBySigla = estados.find(estado => estado.sigla === sigla);

    if (capitalBySigla) {
        message.uf = sigla;
        message.descricao = capitalBySigla.nome;
        message.capital = capitalBySigla.capital;

        return message;
    } else {
        return MESSAGE_ERROR;
    }
};

//Função que retorna os estados de uma região
const getEstadosByRegiao = (regiaoArgumento) => {
    let regiao = String(regiaoArgumento).toUpperCase();

    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias",
        "regiao": '',
        "estados": []
    };

    message.regiao = regiao;

    listaDeEstados.estados.forEach(estado => {
        if (estado.regiao.toUpperCase() === regiao) {
            let estadoByRegiao;
            let estados = message.estados;
            estadoByRegiao = {
                "uf": estado.nome,
                "descricao": estado.nome
            }
            estados.push(estadoByRegiao)
        }
    });

    if (message.estados.length > 0)
        return message;
    else
        return MESSAGE_ERROR;
};

const getEstadosIsCapitalByCountry = () => {
    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias",
        "capitais": []
    };

    listaDeEstados.estados.forEach(estado => {
        if (estado.capital_pais) {
            let capital_atual = estado.capital_pais.capital;
            let uf = estado.sigla;
            let descricao = estado.nome;
            let capital = estado.capital;
            let regiao = estado.regiao;
            let capital_pais_ano_inicio = estado.capital_pais.ano_inicio;
            let capital_pais_ano_termino = estado.capital_pais.ano_fim;

            let capitalPais = {
                capital_atual,
                uf,
                descricao,
                capital,
                regiao,
                capital_pais_ano_inicio,
                capital_pais_ano_termino
            }

            message.capitais.push(capitalPais);
        }
    });

    return message;
};

const getCidadesBySigla = (uf) => {
    let sigla = String(uf).toUpperCase();

    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias",
        "uf": '',
        "descricao": '',
        "quantidade_cidades": '',
        "cidades": []
    };

    let estados = listaDeEstados.estados;
    let estadoById = estados.find(estado => estado.sigla === sigla);

    message.uf = estadoById.sigla;
    message.descricao = estadoById.nome;

    estadoById.cidades.forEach(cidade => {
        let nome = cidade.nome;

        message.cidades.push(nome);
    })

    message.quantidade_cidades = message.cidades.length;

    if(message.cidades.length > 0)
        return message;
    else
        return MESSAGE_ERROR;
};

module.exports = {
    getAllEstados,
    getEstadoByUf,
    getCapitalByUf,
    getEstadosByRegiao,
    getEstadosIsCapitalByCountry,
    getCidadesBySigla
}