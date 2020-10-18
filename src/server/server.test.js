  
const app = require('./server');
const request = require('supertest');

request(app)
  .post('/geonames')
  .send({body: {place:'miami'}})
  .expect('Content-Type', /json/)
  .expect(200, done);