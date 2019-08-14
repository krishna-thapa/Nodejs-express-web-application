// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = 'localhost:3000';
var should = chai.should();

// Configure chai
chai.use(chaiHttp);

describe("Feedback", function() {
    // Test to get all feedback records stored in JSON
    it("should get all feedback records", function(done) {
            chai.request(app)
                .get('/api')
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    done();
                });
        });
        
    // Test to POST single feedback record
    it("should post a single feedback record", function(done) {
        let feedback = {
            name: 'User1',
            title: 'Feedback msg',
            message: 'I like the website'  
        }
            chai.request(app)
                .post('/api')
                .send(feedback)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
    
    // Test to DELETE single feedback record
    it("should delete a single feedback record", function(done) {
        let id = 0
            chai.request(app)
                .delete('/api/'+ id)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
});