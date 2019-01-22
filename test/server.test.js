console.log('testing', process.env.NODE_ENV);
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server.js');
const should = chai.should();

chai.use(chaiHttp);

describe('WeatherDBI', () => {
    beforeEach((done) => { //Before each test we empty the database
        server.weatherDbi.clear()
            .then(() => {
                done();
            })
            .catch((err ) => {
                console.error('While clearing', err);
           });
    });
    /*
     * Test the /GET route
     */
    describe('/POST weather', () => {
        it('it should create one weather record', (done) => {
            chai.request(server.app)
                .post('/api/weather')
                .send({
                    random: Math.random()
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});