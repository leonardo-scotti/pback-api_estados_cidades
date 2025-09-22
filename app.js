/***********************************************************************************************************************
 * Objetivo: API responsável em criar endPoints referente estados e cidades
 * Data: 17/09/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 * 
 * Observações:
 *  express    'npm install express --save'    -> Instala as depndências para criar uma API
 *  cors       'npm install express --save'    -> Instala as dependências para configurar as permissões para uma API
 *  body-parse 'npm install body-parse --save' -> Instala as dependências para receber os tipos de dados via POST ou PUT
 **********************************************************************************************************************/

//Import das dependências do app
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Import do arquivo de funções
const dados = require('./module/functions.js');

//Define uma porta padrão da API, se for em um servidor de nuvem não tem acesso a porta
//Em execução local define 8080
const PORT = process.PORT || 8080;

//Instancia na classe do express
const app = express();

//Configuração do cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*'); //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET'); //Métodos (Verbos) do protocolo HTTP

    app.use(cors());
    next(); //Próximo
});

//Resquest -> recebe os dados da requisição;
//Response -> envia os dados na API.

//==========EndPoints==========

//EndPoint que lista todos os estados
app.get('/v1/estados', (request, response) => {
    let estados = dados.getAllEstados();

    response.status(estados.statuscode);
    response.json(estados);
});

//EndPoint que retorna um estado por UF
app.get('/v1/estado/:uf', (request, response) => {
    let sigla = request.params.uf;

    let estadoBySigla = dados.getEstadoByUf(sigla);

    response.status(estadoBySigla.statuscode);
    response.json(estadoBySigla);
});

//EndPoint que retorna a capital de um estado por UF
app.get('/v1/capital/:uf', (request, response) => {
    let sigla = request.params.uf;

    let capitalBySigla = dados.getCapitalByUf(sigla);

    response.status(capitalBySigla.statuscode);
    response.json(capitalBySigla);
});

//EndPoint que retorna todos os estados de uma REGIÃO
app.get('/v1/estados/:regiao', (request, response) => {
    let regiao = request.params.regiao;

    let estadosByRegiao = dados.getEstadosByRegiao(regiao);

    response.status(estadosByRegiao.statuscode);
    response.json(estadosByRegiao);
});

//EndPoint que retorna todos os estados que são e já foram capitais do Brasil
app.get('/v1/estados/capital', (request, response) => {
    let estadosIsCapital = dados.getEstadosIsCapitalByCountry();

    response.status(estadosIsCapital.statuscode);
    response.json(estadosIsCapital);
});

//EndPoint que retorna todas as cidades de um estado por UF
app.get('/v1/cidades/:uf', (request, response) => {
    let sigla = request.params.uf;

    let cidades = dados.getCidadesBySigla(sigla);

    response.status(cidades.statuscode);
    response.json(cidades);
});

app.listen(PORT, function() {
    console.log('API aguardando requisições...')
})