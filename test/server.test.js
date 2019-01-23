const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server.js');
const should = chai.should();

const expect = global.expect;
const networkMessages = require('../server/network/messages');

chai.use(chaiHttp);

describe('Common backend features', () => {
    afterAll(() => {
        console.log('running afterAll...');
        server.http.close(() => console.log('Stop server'));
    });

    describe('/404 test', () => {

        it('it should call a non-existent API', (done) => {
            expect.assertions(3);
            // let's see if the DB (section) has this item
            chai.request(server.app)
                .get('/api/ololo')
                .end((err, res) => {
                    expect(res.body.success).toBe(false);
                    expect(res.body.reason).toBe(networkMessages.API_NOT_FOUND);
                    expect(res.status).toBe(404);
                    done();
                });
        });
    });

});