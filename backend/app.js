const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const userRoutes = require('./api/v1/routes/user');
const articleRoutes = require('./api/v1/routes/article');
const gifRoutes = require('./api/v1/routes/gif');

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
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/gifs', gifRoutes);
/* router.get('api/v1/user', userCtrl.getUsers);
router.get('api/v1/users/:id', userCtrl.id);
router.post('api/v1/users', userCtrl.createUser);
router.post('api/v1/users', userCtrl.signin);
router.put('api/v1/users/:id', userCtrl.updateUser);
router.delete('api/v1/users/:id', userCtrl.deleteUser); */

module.exports = app;