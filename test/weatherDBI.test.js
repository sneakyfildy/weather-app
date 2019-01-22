const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server.js');
const should = chai.should();
const _ = require('lodash');
chai.use(chaiHttp);

describe('WeatherDBI', () => {
    beforeEach((done) => { //Before each test we empty the database
        // notice that not API is called, but a direct method of DBI
        server.weatherDbi.clear()
            .then(() => {
                // let's see if the DB (section) is empty
                chai.request(server.app)
                    .get('/api/weather')
                    .end((err, res) => {
                        res.body.data.length.should.be.equal(0);
                        res.should.have.status(200);
                        done();
                    });
            })
            .catch((err ) => {
                console.error('While clearing', err);
                done();
           });
    });

    describe('/POST weather', () => {
        it('it should create one weather record', (done) => {
            let expectedValue = Math.random();
            chai.request(server.app)
                .post('/api/weather')
                .send({
                    value: expectedValue
                })
                .end((err, res) => {
                    res.body.success.should.be.equal(true);
                    res.should.have.status(200);

                    // let's see if the DB (section) has this item
                    chai.request(server.app)
                        .get('/api/weather')
                        .end((err, res) => {
                            res.body.data.length.should.be.equal(1);
                            res.body.data[0].value.should.be.equal(expectedValue);
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });

    describe('/GET with params weather', () => {
        it('it should create and fetch one weather record', (done) => {
            let createdRecord = {
                location: {
                    title: Math.floor(Math.random() * 10000000) + ''
                },
                secretValue: Math.random(),
                forecast: {
                    week: [
                        {
                            timestamp: new Date().getTime(),
                            date_human: new Date().toLocaleString()
                        }
                    ]
                }
            };
            chai.request(server.app)
                .post('/api/weather')
                .send(createdRecord)
                .end((err, res) => {
                    // we are expecting that a partcular record was added,
                    // let's query for it
                    res.body.success.should.be.equal(true);
                    res.should.have.status(200);

                    // let's see if the DB (section) has this item
                    chai.request(server.app)
                        .get('/api/weather')
                        .query({
                            child: 'location_title',
                            search_string: createdRecord.location.title
                        })
                        .end((err, res) => {
                            res.body.data.length.should.be.equal(1);
                            let eq = _.isEqual(res.body.data[0].secretValue, createdRecord.secretValue);
                            eq.should.be.equal(true);
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });

    describe('/DELETE weather', () => {
        it('it should remove all weather records', (done) => {
            chai.request(server.app)
                .delete('/api/weather')
                .end((err, res) => {
                    res.body.success.should.be.equal(true);
                    res.should.have.status(200);

                    // let's see if the DB (section) is empty
                    chai.request(server.app)
                        .get('/api/weather')
                        .end((err, res) => {
                            res.body.data.length.should.be.equal(0);
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });

});