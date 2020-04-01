const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate')
const routes = require('./routes');

const app = express();

app.use(cors()); // quando for para produção preciso alterar para o endereço da aplicação, ex: http://meuapp.com
app.use(express.json()); //importante que venha antes das rotas! "converte json em js"
app.use(routes);
app.use(errors());

module.exports = app;


// MÉTODOS HTTP
// GET: buscar/listar info
// POST: criar info 
// PUT: alterar info
// DELETE: deletar info 

// TIPOS DE PARÂMETROS
// QUERY PARAMS: parâmetros nomeados enviados na rota após o "?" (filtros, paginação...) ex: /users?name=Nykolle ... teste no insomnia
// ROUTE PARAMS: parâmetros utilizados para identificar recursos ex: /users/1 (/users/:id)
// REQUEST BODY: corpo da requisição, utilizado para criar ou alterar recursos

// SQLite - configurando 
// DRIVER: SELECT * FROM users 
// QUERY BUILDER (KNEX): table('users').select('*').where()

// JOI biblioteca de validação para JS criada pela Hapi, o CELEBRATE biblioteca que integra o JOI com o framework Express
// Na documentação do JOI tem todos os dados de validação 