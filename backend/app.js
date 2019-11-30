const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('./database/db');

const db = process.env.NODE_ENV? process.env.NODE_ENV : 'development';

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.get('/', (request, response) => {
    response.json({ info: 'Teamwork project with Node.js, Express, and Postgres API' })
});

module.exports = app;