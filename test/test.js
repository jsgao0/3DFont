var request = require('supertest')
  , express = require('express');
 
var app = require('../server.js').webServer();

describe('GET /', function(){
  it('respond with 1', function(done){
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /getGlyfPathByChar/:ttf/:char', function(){
  this.timeout(15000);
  it('respond with JSON', function(done){
    request(app)
      .get('/getGlyfPathByChar/msjh/規')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /serveTypefaceJS/:ttf/:char', function(){
  this.timeout(15000);
  it('respond with JSON', function(done){
    request(app)
      .get('/serveTypefaceJS/msjh/規')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /getGlyfPathByIndex/:ttf/:index', function(){
  this.timeout(15000);
  it('respond with JSON', function(done){
    request(app)
      .get('/getGlyfPathByIndex/msjh/12345')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});