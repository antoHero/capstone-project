const express = require('express');

const router = express.Router();

const articleCtrl = require('../controllers/Article');

const auth = require('../middleware/auth');

router.post('/post', auth, articleCtrl.createArticle);
router.post('/:id', auth, articleCtrl.commentOnArticle);
router.get('/', auth, articleCtrl.getArticles);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.put('/:id', auth, articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);
module.exports = router;
//# sourceMappingURL=article.js.map