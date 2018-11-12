import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../server/app';
import db from '.././server/models'

import {
    insertCountrySeed
} from './helpers/mockData';

const expect = chai.expect;
const request = supertest(app);


chai.use(chaiHttp);

describe('Country controller', ()=>{
    before((done)=>{
        insertCountrySeed();
        done();
    });

    describe('gets all countries in the database GET: /api/v1/groove/countries/',()=>{
        it('should return list of all the countries from the database', (done) => {
            request
              .get(`/api/v1/groove/countries/`)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.body.countries.length).to.equal(3);
                done();
            });
        });
    });
});
