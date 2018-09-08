const promise = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: promise });
const request = require('supertest');
const App = require('../src/App');
const PlaygroundClient = require('../src/db-clients/PlaygroundClient');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Imthcm1hIiwicGFzc3dvcmQiOiJwbGF5Z3JvdW5kIn0sImlhdCI6MTUzNjQwOTk5Nn0.M2xgG_6PvqQ48zz1wGLU5-dUfokiV738ry02px6fksk';


beforeAll(async () => {
  await PlaygroundClient.init('postgres://localhost:5432/playground');
  await App.init();
});

afterAll((done) => {
  pgp.end();
  done();
});

test('Unknown api endpoint', (done) => {
  request(App.instance())
    .get('/api/unknownEndPoint')
    .set('Authorization', 'badToken')
    .expect(404, done);
});

test('Forbidden access to api', (done) => {
  request(App.instance())
    .get('/api/locations')
    .set('Authorization', 'badToken')
    .expect(403, done);
});

test('POST new location', (done) => {
  request(App.instance())
    .post('/api/location/create')
    .send({ name: 'Nice' })
    .set('Authorization',
      `Bearer ${token}`)
    .expect(200, done);
});

test('GET all locations', (done) => {
  request(App.instance())
    .get('/api/locations')
    .set('Authorization',
      `Bearer ${token}`)
    .expect(200, done);
});

