const chai = require('chai');
const chaiHttp = require('chai-http');
require('chai/register-should');
const app = require('../../../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing the endpoints', () => {
    it('It should create a user', (done) => {
        const user = {
            firstname: 'Akoke',
            lastname: 'Anto',
            email: 'veeqanto@gmail.com',
            password: 'ajhggffgda',
            gender: 'male',
            jobRole: 'admin',
            department: 'ict',
            address: 'madalla'
        };
        chai.request(app)
        .post('/api/v1/users/')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.deep.equal(201);
            expect(res.body.data).to.include({
                id: 1,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                gender: user.gender,
                jobRole: user.jobRole,
                department: user.department,
                address: user.address
            });
            done();
        });
    });

    it('It should not create a user with incomplete form fields', (done) => {
        const user = {
            firstname: 'Akoke',
            lastname: 'Anto',
            email: 'veeqanto@gmail.com',
            password: 'ajhggffgda',
            gender: 'male',
            jobRole: 'admin',
            department: 'ict',
        };
        chai.request(app)
        .post('/api/v1/users')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
        });
    });

    it('It should get all users', (done) => {
        chai.request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('firstname');
            res.body.data[0].should.have.property('lastname');
            res.body.data[0].should.have.property('email');
            res.body.data[0].should.have.property('password');
            res.body.data[0].should.have.property('gender');
            res.body.data[0].should.have.property('jobRole');
            res.body.data[0].should.have.property('department');
            res.body.data[0].should.have.property('address');
            done();
        });
    });

    it('It should get a particular user', (done) => {
        const userId = 1;
        chai.request(app)
        .get('/api/v1/users/${userId}')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            res.body.should.have.property('message')
            .eql('Cannot find user with the id ${userId}');
            done();
        });
    });

    it('It should not get a particular user with invalid id', (done) => {
        const userId = 8888;
        chai.request(app)
        .get('/api/v1/users/${userId}')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.deep.equal(404);
            //expect(res.body).to.eql('Cannot find the user with the id ${userId}');
            
            done();
        });
    });

    it('It should not get specific user with non-numeric id', (done) => {
        const userId = 'aaa';
        chai.request(app)
        .get('/api/v1/users/${userId}')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.deep.equal(404);
            //expect(res.body).to.eql(`Please enter a numeric value`);
            done();
        });
    });

    it('It should update a user', (done) => {
        const userId = 1;
        const updateUser = {
            id: userId,
            firstname: 'Anto',
            lastname: 'Anto',
            email: 'veeqanto@gmail.com',
            password: 'ajhggffgda',
            gender: 'male',
            jobRole: 'admin',
            department: 'ict',
        };
        chai.request(app)
        .put('/api/v1/users/${userId}')
        .set('Accept', 'application/json')
        .send(updateUser)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.id).equal(updateUser.id);
            expect(res.body.data.firstname).equal(updateUser.firstname);
            expect(res.body.data.lastname).equal(updateUser.lastname);
            expect(res.body.data.email).equal(updateUser.email);
            expect(res.body.data.password).equal(updateUser.password);
            expect(res.body.data.gender).equal(updateUser.gender);
            expect(res.body.data.jobRole).equal(updateUser.jobRole);
            expect(res.body.data.department).equal(updateUser.department);
            expect(res.body.data.address).equal(updateUser.address);
            done();
        });
    });

    it('It should not update a user with invalid id', (done) => {
        const userId = 9999;
        const updateUser = {
            id: userId,
            firstname: 'Anto',
            lastname: 'Anto',
            email: 'veeqanto@gmail.com',
            password: 'ajhggffgda',
            gender: 'male',
            jobRole: 'admin',
            department: 'ict',
        };
        chai.request(app)
        .put('/api/v1/users/${userId}')
        .set('Accept', 'application/json')
        .send(updateUser)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.have.property('message')
            .eql('Cannot find user with the id ${userId}');
            done();
        });
    });

    it('It should not update a user with non numeric id', (done) => {
        const userId = 'ggg';
        const updateUser = {
            id: userId,
            firstname: 'Anto',
            lastname: 'Anto',
            email: 'veeqanto@gmail.com',
            password: 'ajhggffgda',
            gender: 'male',
            jobRole: 'admin',
            department: 'ict',
        };
        chai.request(app)
        .put('/api/v1/users/${userId}')
        .set('Accept', 'application/json')
        .send(updateUser)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.have.property('message')
            .eql('Input a valid numeric value');
            done();
        });
    });

    it('It should delete a user', (done) => {
        const userId = 1;
        chai.request(app)
        .delete('/api/v1/users/${userId}')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data).to.include({});
            done();
        });
    });

    it('It should not delete a user with invalid id', (done) => {
        const userId = 777;
        chai.request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.have.property('message')
            .eql(`User with the id ${userId} cannot be found`);
            done();
        });
    });

    it('It should not delete a user with non-numeric id', (done) => {
        const userId = 'gggg';
        chai.request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.have.property('message')
            .eql(`Provide a numeric value`);
            done();
        });
    });

    /**Write unit tests for Article */
    it('It should fail to create an article ', (done) => {
        const data = {};
        chai.request(app)
          .post('/api/v1/articles')
          .send(data)
          .set('Accept', 'application/json')
          .end((request, response) => {
            expect(response.status).to.equal(422);
            done();
          });
        
      });

      it('It should fail to create an article due database issues ', (done) => {
        
        chai.request(app)
          .post('/api/v1/articles')
          .send(data)
          .set('Accept', 'application/json')
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(501);
              done();
          });
        
      });

      it('It should create an article', (done) => {
        const data = {
          title: 'Moonwalker',
          article: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.',
        };
        chai.request(app)
          .post('/api/v2/articles')
          .send(data)
          .set('Accept', 'application/json')
          .end((request, response) => {
            expect(response.status).to.deep.equal(201);
            response.body.should.have.property('message')
              .equal('Article successfully created');
            response.body.should.have.property('data');
            response.body.data.should.be.an('Object');
            
            response.body.data.should.have.property('title')
              .equal(data.title);
              response.body.data.should.have.property('article')
              .equal(data.article);
              response.body.data.should.have.property('datePosted');
              response.body.data.should.have.property('user_id')
              .equal(data.user_id);
              done();
          });
        
      });
    
      it('It should not find article', (done) => {
        const articleID = -1;
        chai.request(app)
          .get(`/api/v1/articles/${articleID}`)
          .set('Accept', 'application/json')
          .end((request, response) => {
            expect(response.status).to.deep.equal(404);
            response.body.should.have.property('message')
              .equal('Article not found !');
              done();
          });
        
      });
    
      it('It should find article', (done) => {
        const articleID = 1;
        chai.request(app)
          .get(`/api/v1/articles/${articleID}`)
          .set('Accept', 'application/json')
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(200);
            response.body.should.have.property('message')
              .equal('Article found !');
            response.body.should.have.property('data');
            response.body.data.should.be.an('Object');
            done();
          });
        
      });
    
      it('should get feeds', (done) => {
        chai.request(server)
          .get('/api/v1/feeds')
          .set('Accept', 'application/json')
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(200);
            response.body.should.have.property('message')
              .equal('Success');
            response.body.should.have.property('data');
            done();
          });
        
      });
    
      it('It should delete article', (done) => {
        const articleID = 1;
        chai.request(app)
          .delete(`/api/v1/articles/${articleID}`)
          .set('Accept', 'application/json')
          .end((request, response) => {
            response.status.should.equal(204);
            done();
          });
        
      });
    
      it('It should fail to delete article', (done) => {
        const articleID = 9;
        chai.request(app)
          .delete(`/api/v1/articles/${articleID}`)
          .set('Accept', 'application/json')
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(404);
            response.body.should.have.property('message')
              .equal('Article Not Found !!');
              done();
          });
        
      });
    
      it('It should fail to add comment', (done) => {
        const comment = '';
        const articleId = 4;
        chai.request(app)
          .post(`/api/v1/articles/${articleId}/comments`)
          .set('Accept', 'application/json')
          .send({ comment })
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(422);
              done();
          });
        
      });
    
      it('It should add a comment', (done) => {
        const comment = 'This is what i used to say to people and they didn\'t believe me !!';
        const articleId = 1;
        chai.request(app)
          .post(`/api/v1/articles/${articleId}/comments`)
          .set('Accept', 'application/json')
          .send({ comment })
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(201);
            response.body.should.have.property('message').equal('Comment successfully added.');
            response.body.data.should.have.property('comment').equal(comment);
            done();
          });
       
      });
    
      it('It should fail to update article', (done) => {
        const articleId = 800;
        const data = {
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
          article: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia.',
        };
        chai.request(app)
          .put(`/api/v1/articles/${articleId}`)
          .set('Accept', 'application/json')
          .send(data)
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(404);
            response.body.should.have.property('message').equal('Article not found !');
            done();
          });
        
      });
    
      it('It should fail to update article', (done) => {
        const articleId = 1;
        chai.request(app)
          .patch(`/api/v1/articles/${articleId}`)
          .set('Accept', 'application/json')
          .send({})
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(422);
              done();
          });
        
      });
    
      it('It should edit article', (done) => {
        const articleId = 1;
        const data = {
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
          article: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.',
        };
        chai.request(app)
          .patch(`/api/v1/articles/${articleId}`)
          .set('Accept', 'application/json')
          .send(data)
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(200);
            response.body.should.have.property('message')
              .equal('Article successfully edited');
            response.body.should.have.property('data');
            response.body.data.should.be.an('Object');
            response.body.data.should.have.property('title')
              .equal(data.title);
            response.body.data.should.have.property('article')
              .equal(data.article);
              done();
          });
       
      });
    
      it('It should not find article, wrong tag', () => {
        const tagId = 100;
        chai.request(app)
          .get(`/api/v1/feeds/${tagId}/tags`)
          .set('Accept', 'application/json')
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(404);
            response.body.should.have.property('message')
              .equal('No articles found !');
              done();
          });
      });
    
      it('It should find articles by tag', () => {
        const tagId = 1;
        chai.request(app)
          .get(`/api/v1/feeds/${tagId}/tags`)
          .set('Accept', 'application/json')
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(200);
            response.body.should.have.property('message')
              .equal('Success');
            response.body.data.should.be.an('Array');
            done();
          });
      });
    
      it('It should not find articles by author', () => {
        const authorId = 0;
        chai.request(app)
          .get(`/api/v1/author/articles/${authorId}`)
          .set('Accept', 'application/json')
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(404);
            response.body.should.have.property('message')
              .equal('No articles found !');
              done();
          });
      });
    
      it('It should find articles by author', () => {
        const authorId = 1;
        chai.request(app)
          .get(`/api/v1/author/articles/${authorId}`)
          .set('Accept', 'application/json')
          .end((request, response) => {
            response.body.should.have.property('status')
              .equal(200);
            response.body.should.have.property('message')
              .equal('Success');
            response.body.data.should.be.an('Array');
            done();
          });
      });    

    /** Test the gif endpoints */

it('It should create an gif', (done) => {
        const gifs = {
            title: 'The life of Pi',
            gifUrl: 'skjkjjhjfhjshfjhsjk',
            user_id: 2
        };
        chai.requests(app)
        .post('/api/v1/gifs')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.data).to.include({
                id: 1,
                title: gifs.title,
                datePosted: gifs.gifUrl,
                user_id: gifs.user_id
            });
            done();
        });
    });

    it('It should not create a gif with incomplete form fields', (done) => {
        const gifs = {
            title: 'The life of Pi',
            user_id: 2
        };
        chai.request(app)
        .post('/api/v1/gifs')
        .set('Accept', 'application/json')
        .send(gifs)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        });
    });

    it('It should get all gifs', (done) => {
        chai.request(app)
        .get('/api/v1/gifs')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('title');
            res.body.data[0].should.have.property('gifUrl');
            res.body.data[0].should.have.property('user_id');
            done();
        });
    });

    it('It should get a particular gif', (done) => {
        const gifId = 1;
        chai.request(app)
        .get('/api/v1/gifs/${gifId}')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('title');
            res.body.data[0].should.have.property('gifUrl');
            res.body.data[0].should.have.property('user_id');
            done();
        });
    });

    it('It should not get a particular gif with invalid id', (done) => {
        const gifId = 88888888;
        chai.request(app)
        .get('/api/v1/gifs/${gifId}')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(404)
            .res.body.should.have.property('message')
            .eql('Cannot find gif with the id ${gifId}');
            done();
        });
    });

    it('It should not get specific gif with non-numeric id', (done) => {
        const gifId = 'aasd';
        chai.request(app)
        .get('/api/v1/gifs/${gifid}')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.have.property('message')
            .eql('Please input a numeric value');
            done();
        });
    });

    it('It should update a gif', (done) => {
        const gifId = 1;
        const updateGif = {
            id: gifId,
            title: 'The life of pie',
            gifUrl: 'hghf hghghgas gvvvhjvhd',
            user_id: 2
        };
        chai.request(app)
        .put('/api/v1/gifs/${gifId}')
        .set('Accept', 'application/json')
        .send(updateGif)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.id).equal(updateGif.id);
            expect(res.body.data.title).equal(updateGif.title);
            expect(res.body.data.gifUrl).equal(updateGif.gifUrl);
            done();
        });
    });

    it('It should not update a gif with invalid id', (done) => {
        const gifId = 9999;
        const updateGif = {
            id: gifId,
            title: 'The life of Pi',
            gifUrl: 'ajkjdj jkjkdj @gmail.com',
            user_id: 2
        };
        chai.request(app)
        .put('/api/v1/gifs/${gifId}')
        .set('Accept', 'application/json')
        .send(updateUser)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.have.property('message')
            .eql('Cannot find gif with the id ${gifId}');
            done();
        });
    });

    it('It should not update a gif with non numeric id', (done) => {
        const gifId = 'ggg';
        const updateGif = {
            id: gifId,
            tile: 'The life of Pi',
            gifUrl: 'Anto',
            user_id: 2
        };
        chai.request(app)
        .put('/api/v1/gifs/${gifId}')
        .set('Accept', 'application/json')
        .send(updateArticle)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.have.property('message')
            .eql('Input a valid numeric value');
            done();
        });
    });

    it('It should delete a gif', (done) => {
        const gifId = 1;
        chai.request(app)
        .delete('/api/v1/gifs/${gifId}')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data).to.include({});
            done();
        });
    });

    it('It should not delete a gif with invalid id', (done) => {
        const gifId = 777;
        chai.request(app)
        .delete(`/api/v1/gifs/${gifId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.have.property('message')
            .eql(`Gif with the id ${gifId} cannot be found`);
            done();
        });
    });

    it('It should not delete a gif with non-numeric id', (done) => {
        const gifId = 'gggg';
        chai.request(app)
        .delete(`/api/v1/gifs/${gifId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.have.property('message')
            .eql(`Provide a numeric value`);
            done();
        });
    });
})