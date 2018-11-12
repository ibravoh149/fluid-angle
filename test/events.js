import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../server/app';
import db from '.././server/models'
import {
  insertUserSeed,
  user1token,
  user2token,
  insertEventSeed,
  insertLocationSeed,
  insertDateSeed,
  insertTicketDetailseed,
  validEvent,
  eventWithNoTitle,
  eventWithNoDescription,
  eventWithNoOrganiser,
  eventWithNoVenue,
  eventWithNoStateId,
  eventWithNoAddress,
  eventWithNoStartDate,
  eventWithNoStartTime,
  eventWithNoEndTime,
  eventWithNoEndDate,
  eventWithNoTicketDetails
} from './helpers/mockData';

const expect = chai.expect;
const request = supertest(app);
let token = '';
let token1 = '';

chai.use(chaiHttp);

describe('Events Controller', () => {
  before((done) => {
    
        insertUserSeed();
        insertEventSeed();
        insertLocationSeed();
        insertDateSeed();
        insertTicketDetailseed();

        token = user1token;
        token1 = user2token;
        done();
  });

  describe('Create New Event POST: /api/v1/groove/events/new', () => {
    it('should successfully create a new event', (done) => {
      request
        .post('/api/v1/groove/events/new')
        .set({ authorization: token })
        .send(validEvent)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201)
          expect(res.body.message).to.equal('Event successfully posted, please wait 24 hours for verification');
          done();
        });
    });
  });

  describe('Create New Event Validation POST:/api/v1/groove/events/new', () => {
    it('should return a 400 error with no event title', (done) => {
      request
        .post('/api/v1/groove/events/new')
        .set({ authorization: token })
        .send(eventWithNoTitle)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'Title can\'t be less than 5 characters.'
            );
          done();
        });
    });
    it('should return a 400 error with no event description', (done) => {
      request
        .post('/api/v1/groove/events/new')
        .set({ authorization: token })
        .send(eventWithNoDescription)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'Description can\'t be less than 10 characters.'
            );
          done();
        });
    });
    it('should return a 400 error with no event organiser', (done) => {
      request
        .post('/api/v1/groove/events/new')
        .set({ authorization: token })
        .send(eventWithNoOrganiser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'Organiser can\'t be empty.'
            );
          done();
        });
    });
    it('should return a 400 error with no event venue', (done) => {
      request
        .post('/api/v1/groove/events/new')
        .set({ authorization: token })
        .send(eventWithNoVenue)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'Venue cannot be empty.'
            );
          done();
        });
    });
    it('should return a 400 error with no event stateId', (done) => {
      request
        .post('/api/v1/groove/events/new')
        .set({ authorization: token })
        .send(eventWithNoStateId)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'you must select a state.'
            );
          done();
        });
    });
    it('should return a 400 error with no event address', (done) => {
      request
        .post('/api/v1/groove/events/new')
        .set({ authorization: token })
        .send(eventWithNoAddress)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'Address cannot be empty.'
            );
          done();
        });
    });
 
  it('should return a 400 error with no event start date', (done) => {
    request
      .post('/api/v1/groove/events/new')
      .set({ authorization: token })
      .send(eventWithNoStartDate)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400)
        expect(res.body.message[0].msg)
          .to
          .equal(
          'you must select a start date.'
          );
        done();
      });
    });

      it('should return a 400 error with no event start time', (done) => {
        request
          .post('/api/v1/groove/events/new')
          .set({ authorization: token })
          .send(eventWithNoStartTime)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(400)
            expect(res.body.message[0].msg)
              .to
              .equal(
              'you must select a start time.'
              );
            done();
          });
        });
        it('should return a 400 error with no event end time', (done) => {
          request
            .post('/api/v1/groove/events/new')
            .set({ authorization: token })
            .send(eventWithNoEndTime)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(400)
              expect(res.body.message[0].msg)
                .to
                .equal(
                'you must select an end time.'
                );
              done();
            });
          });
          it('should return a 400 error with no event end date', (done) => {
            request
              .post('/api/v1/groove/events/new')
              .set({ authorization: token })
              .send(eventWithNoEndDate)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(400)
                expect(res.body.message[0].msg)
                  .to
                  .equal(
                  'you must select an end date.'
                  );
                done();
              });
            });

            it('should return a 400 error with no event ticket details', (done) => {
              request
                .post('/api/v1/groove/events/new')
                .set({ authorization: token })
                .send(eventWithNoTicketDetails)
                .end((err, res) => {
                  if (err) return done(err);
                  expect(res.status).to.equal(400)
                  expect(res.body.message[0].msg)
                    .to
                    .equal(
                    "you must add one or more ticket detail(s)"
                    );
                  done();
                });
              });

  });
 




  // // Get events test suite

  describe('Get Events Suite GET: /api/v1/groove/events/', () => {
    describe('Get All Events', () => {
      it('should successfully retrieve all verified events', (done) => {
        request
          .get('/api/v1/groove/events/')
          .expect(200)
          .end((err, res) => {
            expect(res.body.events.length).to.equal(2);
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Get one event GET: /api/v1/groove/events/:eventId/details', () => {
      it('should successfully get an event', (done) => {
        request
          .get(`/api/v1/groove/events/1/details`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.event.id).to.equal(1);
            done();
          });
      });
      it('should return a 400 error if event of id 55 not found', (done) => {
        request
          .get(`/api/v1/groove/events/55/details`)
          .set({ authorization: token })
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('No event with id 55');
            done();
          });
      });
     });
 });


  //  user events test suite

describe('Gets all events added by the Authenticated user Get: /api/v1/groove/users/:id/events', ()=>{
  it('should return events of the current user', (done) => {
          request
            .get(`/api/v1/groove/users/2/events`)
            .set({ authorization: token })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body.events.length).to.equal(2);
              done();
            });
        });

  it('should return a 401 error if the user ID supplied is not authenticated',
  (done) => {
    request
      .get(`/api/v1/groove/users/98/events`)
      .set({ authorization: token })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message)
          .to
          .equal('User id supplied is not authenticated');
        done();
      });
  });
});


 
  // // Delete recipes test suite

  // describe('Delete Recipes Suite DELETE: /api/v1/recipes', () => {
  //   describe('Delete User Recipe', () => {
  //     it('should successfully delete a recipe added by the authenticated use',
  //       (done) => {
  //         request
  //           .delete(`/api/v1/recipes/1`)
  //           .set({ authorization: token })
  //           .expect(200)
  //           .end((err, res) => {
  //             if (err) return done(err);
  //             expect(res.body.message).to.equal('Recipe deleted');
  //             done();
  //           });
  //       });
  //   });
  //   describe('Delete User Recipe Validation DELETE: /api/v1/recipes/:id',
  //     () => {
  //       it(`should return a 403 error on 
  //       deleting a recipe added by another user`,
  //         (done) => {
  //           request
  //             .delete(`/api/v1/recipes/3`)
  //             .set({ authorization: token })
  //             .expect(403)
  //             .end((err, res) => {
  //               if (err) return done(err);
  //               expect(res.body.message)
  //                 .to
  //                 .equal('You don\'t have permision to delete this recipe');
  //               done();
  //             });
  //         });
  //     });
  //   it('should retuen a 404 error if no recipe with the ID supplied',
  //     (done) => {
  //       request
  //         .delete(`/api/v1/recipes/${99}`)
  //         .set({ authorization: token })
  //         .expect(404)
  //         .end((err, res) => {
  //           if (res) return done(err);
  //           expect(res.body.message)
  //             .to
  //             .equal('Not found');
  //           done();
  //         });
  //     });
  // });

});
