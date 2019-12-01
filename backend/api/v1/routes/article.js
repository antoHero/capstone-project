const express = require('express');
const router = express.Router();
const Article = require('../controllers/Article');
const auth = require('../middleware/auth');

router.post('/post', auth,  Article.createArticle);
router.post('/:id/comments', auth, Article.commentOnArticle);
router.get('/feeds', Article.getArticles);
router.get('/:id', auth, Article.getOneArticle);
router.get('/category', auth, Article.getArticleByCategory);
router.put('/:id', auth, Article.updateArticle);
router.delete('/:id', auth, Article.deleteArticle);



module.exports = router;