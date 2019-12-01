const chai = require('chai');
const chaiHttp = require('chai-http');
require('chai/register-should');
const app = require('../../../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('API endpoints', function() {
  it('It should create an article', (done) => {
    const articles = {
      title: 'The life of PI',
      article: 'Jggh akjjksd ghhkhoauy akjd hjhadu uhugsla uuiuas biubakj  ood'
    };
    chai.request(app)
    .post('/api/v1/articles')
    .send(articles)
    .set('Accept', 'application/json')
    .end((req, res) => {
      expect(res.status).to.equal(201);
      res.body.should.have.property('data');
      res.body.should.have.property('message')
      .equal('Article created successfully');
      res.body.data.should.be.an('Object');
      res.body.data.should.have.property('datePosted');
      res.body.data.should.have.property('title')
      .equal(articles.title);
      res.body.data.should.have.property('article')
      .equal(articles.article);
    });
    done();
  });

  

  it('It should get all articles', (done) => {
    chai.request(app)
    .get('/api/v1/articles/feeds')
    .set('Accept', 'application/json')
    .end((req, res) => {
      expect(res.status).to.equal(200);
      res.body.should.have.property('message').equal('Success');
      res.body.should.have.property('data');
    });
    done();
  });

  it('It should find a single article', (done) => {
    const articleId = 1;
    chai.request(app)
    .get('/api/v1/articles/:${articleId}')
    .set("Accept", 'application/json')
    .end((req, res) => {
      expect(res.status).to.equal(200);
      res.body.should.have.property('message').equal('Success');
      res.body.should.have.property('data');
      res.body.data.should.be.an('Object');
    });
    done();
  });

  it('It should delete an article', (done) => {
    const articleId = 1;
    chai.request(app)
    .delete('/api/v1/articles/:${articleId}')
    .set('Accept', 'application/json')
    .end((req, res) => {
      expect(res.status).to.equal(204);
    });
    done();
  });

  it('It should update an article', (done) => {
    const articleId = 1;
    const data = {
      title: 'Monkey king',
      article: 'Nothing here'
    }
    chai.request(app)
    .put('/api/v1/articles/:{articleId}')
    .set('Accept', 'application/json')
    .send(data)
    .end((req, res) => {
      expect(res.status).to.equal(200);
      res.body.data.should.be.an('Object');
      res.body.should.have.property('data');
      res.body.data.should.have.property('title')
      .equal(data.title);
      res.body.data.should.have.property('article')
      .equal(data.article);
    });
    done();
  });

  it('It should comment on an article', (done) => {
    const comment = 'This is the first test comment';
    const articleId = 1;
    chai.request(app)
    .post('/api/v1/articles/$articleId/comments/')
    .set('Accept', 'application/json')
    .send({comment})
    .end((req, res) => {
      expect(res.status).to.be.equal(201);
      res.body.should.have.property('message').equal('comment added');
      res.body.data.should.have.property('comment').equal(comment);
    });
    done();
  });

  it('It should view article by category', (done) => {
    const categoryId = 1;
    chai.request(app)
    .get('/api/v1/feeds/${categoryId}/category')
    .set('Accept', 'application/json')
    .end((req, res) => {
      expect(res.status).to.equal(200);
      res.body.data.should.be.an('Array');
    });
    done();
  });

  it('It should get all users', (done) => {
    chai.request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json')
    .end((req, res) => {
      expect(res.status).to.equal(200);
      res.body.should.have.property('message').equal('Success');
      res.body.should.have.property('data');
    });
    done();
  });

  it('It should find a single user', (done) => {
    const userId = 1;
    chai.request(app)
    .get('/api/v1/users/:${userId}')
    .set("Accept", 'application/json')
    .end((req, res) => {
      expect(res.status).to.equal(200);
      res.body.should.have.property('message').equal('Success');
      res.body.should.have.property('data');
      res.body.data.should.be.an('Object');
    });
    done();
  });
});