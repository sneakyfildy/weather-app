const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server.js');
const should = chai.should();
const expect = global.expect;
chai.use(chaiHttp);

describe('WeatherDBI', () => {
    afterAll(() => {
        console.log('running afterAll...');
        server.http.close(() => console.log('Stop server'));
    });
    beforeEach((done) => { //Before each test we empty the database
        // notice that not API is called, but a direct method of DBI
        server.weatherDbi.clear()
            .then(() => done())
            .catch((err ) => {
                console.error('While clearing', err);
                done();
           });
    });

    describe('/POST & /GET weather', () => {
        it('it should create one weather record and get one record afterwards', (done) => {
            expect.assertions(5);
            let expectedValue = Math.random();

            chai.request(server.app)
                .post('/api/weather')
                .send({
                    value: expectedValue
                })
                .end((err, res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.status).toBe(200);

                    // let's see if the DB (section) has this item
                    chai.request(server.app)
                        .get('/api/weather')
                        .end((err, res) => {
                            expect(res.body.data.length).toBe(1);
                            expect(res.body.data[0].value).toBe(expectedValue);
                            expect(res.status).toBe(200);
                            done();
                        });
                });
        });
    });

    describe('/GET with params weather', () => {
        it('it should create and fetch one weather record', (done) => {
            expect.assertions(4);

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
                    expect(res.body.success).toBe(true);
                    expect(res.status).toBe(200);

                    // let's see if the DB (section) has this item
                    chai.request(server.app)
                        .get('/api/weather')
                        .query({
                            child: 'location_title',
                            search_string: createdRecord.location.title
                        })
                        .end((err, res) => {
                            expect(res.body.data.length).toBe(1);
                            expect(res.body.data[0].secretValue).toBe(createdRecord.secretValue);
                            done();
                        });
                });
        });
    });

    describe('/DELETE weather', () => {
        expect.assertions(4);

        it('it should remove all weather records', (done) => {
            chai.request(server.app)
                .delete('/api/weather')
                .end((err, res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.status).toBe(200);

                    // let's see if the DB (section) is empty
                    chai.request(server.app)
                        .get('/api/weather')
                        .end((err, res) => {
                            expect(res.body.data.length).toBe(0);
                            expect(res.status).toBe(200);
                            done();
                        });
                });
        });
    });

});