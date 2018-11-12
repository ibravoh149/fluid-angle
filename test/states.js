import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../server/app';

// import {
//     //insertStateSeed
// } from './helpers/mockData';

const expect = chai.expect;
const request = supertest(app);


chai.use(chaiHttp);

describe('State controller', ()=>{
    describe('gets all states in the database GET: /api/v1/groove/country/:id/states',()=>{
        it('should return list of all the states by country id from the database', (done) => {
            request
              .get(`/api/v1/groove/country/1/states`)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.body.states.length).to.equal(5);
                done();
            });
        });
    });
});