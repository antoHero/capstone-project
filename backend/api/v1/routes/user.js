const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');

router.post('/create-user', userCtrl.create);
router.post('/signin', userCtrl.signin);
router.get('/', userCtrl.getUsers);


module.exports = router;