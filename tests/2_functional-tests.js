/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
      });
      done();
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({
            title: "Manusia Salmon",
          })
          .end(function(req, res){
            assert.equal(res.status, 200);
            assert.property(
              res.body,
              "title",
              "Books in array should contain title"
            );
            _id = res.body._id;
          })
        done();
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({
            title: undefined
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text, "missing required field title");
          })
        done();
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai
          .request(server)
          .get('/api/books')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body, "response should be array");
          })
        done();
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
          .request(server)
          .get('/api/books/invalidID')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text, "no books exists");
          })
        done();
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        // test with valid id
        const _id ='671b3d778851944bf782fd2f';
        chai
          .request(server)
          // method
          .get('/api/books/'+_id)
          .end(function(err, res){
            // check status
            assert.equal(res.status, 200);
            // check the title of book
            assert.property(
              res.body,
              "title",
              "Books in array should contain title",
            );
            // check the id of book
            assert.property(
              res.body,
              "_id",
              "Books in array should contain _id"
            );
          })
        done();
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        // post data with comment
        chai
          .request(server)
          // method
          .post('/api/books/671b3c3b54367cc5e5d7b613')
          .send({
            comment: "The book really inspired me"
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            //check the title of book
            assert.property(
              res.body,
              "title",
              "Books in array should contain title",
            );
            // check the id of book
            assert.property(
              res.body,
              "_id",
              "Books in array should contain _id"
            );
          })
          done();
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        // post without comment field (negative case)
        chai
          .request(server)
          // method
          .post('/api/books/671afbe38852fd81866bdfc4')
          .send({
            comment: undefined
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text, "missing required field comment");
            // check the title of book
            assert.property(
              res.body,
              "title",
              "Books in array should contain title",
            );
            // check the id of book
            assert.property(
              res.body,
              "_id",
              "Books in array should contain _id"
            );
          })
        done();
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        // post with comment where id doesn't exist in db
        chai
          .request(server)
          // method
          .post('/api/books/71a1akugantengbangetf5c36c')
          .send({
            comment: "nice book"
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text, "no books exists");
          })
        done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
          .request(server)
          .delete('/api/books/671b408c3c7684d3e7fc580f')
          .end(function(err, res){
            console.log(res.status, res.text)
            assert.equal(res.status, 200);
            assert.equal(res.text, "delete successful");
          })
        done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        // delete if id data doesnt exist
        chai
          .request(server)
          .delete('/api/books/671b0projo20242f37b')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text, "no books exists");
            console.log(res.status, res.text);
          })
        done();
      });

    });

  });

});
