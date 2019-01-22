const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server.js');
const should = chai.should();

const networkMessages = require('../server/network/messages');

chai.use(chaiHttp);

describe('WeatherDBI', () => {

    describe('/404 test', () => {
        it('it should call a non-existent API', (done) => {
            // let's see if the DB (section) has this item
            chai.request(server.app)
                .get('/api/ololo')
                .end((err, res) => {
                    res.body.success.should.be.equal(false);
                    res.body.reason.should.be.equal(networkMessages.API_NOT_FOUND);
                    res.should.have.status(404);
                    done();
                });
        });
    });

});