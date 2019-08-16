// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../app/app');

// Configure chai
chai.use(chaiHttp);

describe("Test results for Feedback", function () {
  // Test to get all feedback records stored in JSON
  it("should get all feedback records", function (done) {
    chai.request(server)
      .get('/api')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
      require('../app/app').stop();
  });

  // Test to POST single feedback record
  it("should post a single feedback record", function (done) {
    let feedback = {
      name: 'User1',
      title: 'Feedback msg',
      message: 'I like the website'
    }
    chai.request(server)
      .post('/api')
      .send(feedback)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
      require('../app/app').stop();
  });

  // Test to DELETE single feedback record
  it("should delete a single feedback record", function (done) {
    let id = 0
    chai.request(server)
      .delete('/api/' + id)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
      require('../app/app').stop();
  });
});