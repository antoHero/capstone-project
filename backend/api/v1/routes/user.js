const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');
const auth = require('../middleware/auth');

router.post('/create-user', auth, userCtrl.create);
router.post('/signin',auth, userCtrl.signin);
router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getOneUser);


module.exports = router;