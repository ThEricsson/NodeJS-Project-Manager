'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Carregar rutes

var project_routes = require('./routes/project')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Acces-Control-Allow-Credentials', true)
    next();
});

//rutes
app.use('/api', project_routes)

//exportar
app.get('/test', (req, res) => {
    res.status(200).send({
        message: "Hola món des de l'api de Node Js"
    })
});

app.get('/', (req, res) => {
    res.status(200).send('<h1> Projecte M8 Node JS </h1>')
})

app.post('/testpost/:curs', (req, res) => {
    //console.log("Mòdul:", req.param('modul'), "UF:", req.param('uf'));
    console.log("Mòdul:", req.body.modul, "UF:", req.body.uf);
    console.log("Projecte:", req.query.projecte)
    console.log("Curs: ", req.params.curs)
    res.status(200).send({
        message: 'Ruta per Post'
    });
})

//exports
module.exports = app;