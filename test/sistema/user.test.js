var assert = require('assert');
var expect = require('chai').expect; 

var mongoose = require('mongoose');  
var mockgoose = require('mockgoose');

var app = require('../../app');  
var request = require('supertest')(app);

before(function() {
    mockgoose(mongoose);
});

after(function() {
    mockgoose.reset();
    mongoose.connection.close();
});

describe('Na requisição POST /user', function() {
    
    it('deveria cadastrar com sucesso um user novo', function(done) {
        var user = {
            name: 'xpto-test',
            email: 'xpto' + Math.random() + '@gmail.com',
            password: 'xpto'
        };

        request.post('/api/user').send(user).expect(201).end(function(error, response) {
			if (error) {
				return done(error);
			}
			
			expect(response.body._id).to.not.undefined;
			expect(response.body.name).to.equal(user.name);
			expect(response.body.email).to.equal(user.email);
			
			done();
        });
    });
    
    it('não deveria cadastrar um usuario sem nome', function(done) {
        var user = {
            email: 'xpto' + Math.random() + '@gmail.com',
            password: 'xpto'
        };

        request.post('/api/user').send(user).expect(400).end(function(error, response) {
			if (error) {
				return done(error);
			}
			
			expect(response.body.message).to.not.undefined;
			
			done(); 
        });
    }); 
    
    it('não deveria cadastrar um usuario sem email', function(done) {
        var user = {
            name: 'xpto-test',
            password: 'xpto'
        };

        request.post('/api/user').send(user).expect(400).end(function(error, response) {
			if (error) {
				return done(error);
			}
			
			expect(response.body.message).to.not.undefined;
			
			done(); 
        });
    });
    
    it('não deveria cadastrar um usuario sem senha', function(done) {
        var user = {
            name: 'xpto-test',
            email: 'xpto' + Math.random() + '@gmail.com'
        };

        request.post('/api/user').send(user).expect(400).end(function(error, response) {
			if (error) {
				return done(error);
			}
			
			expect(response.body.message).to.not.undefined;
			
			done(); 
        });
    });
    
    it('não deveria cadastrar um usuario com mesmo email', function(done) {
        var user = {
            name: 'xpto-test',
            email: 'xpto' + Math.random() + '@gmail.com',
            password: 'xpto'
        };

        request.post('/api/user').send(user).expect(201).end(function(error, response) {
			if (error) {
				return done(error);
			}
			
			expect(response.body._id).to.not.undefined;
			
			request.post('/api/user').send(user).expect(400).end(function(error, response) {
				if (error) {
					return done(error);
				}
				
				expect(response.body.message).to.not.undefined;
				
				done();
			});
        });
    });
});