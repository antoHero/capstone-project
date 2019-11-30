const express = require('express');
const router = express.Router();
const gifCtrl = require('../controllers/Gif');

router.post('/post', gifCtrl.createGif);
router.post('/:id', gifCtrl.commentOnGif);
router.get('/', gifCtrl.getAllGifs);
router.get('/:id', gifCtrl.getOneGif);
router.put('/:id', gifCtrl.updateGif);
router.delete('/:id', gifCtrl.deleteGif);



module.exports = router;