const argv = require('yargs').argv;
const isProd = argv.APP_MODE === 'production';
const returnStatus = require('./returnStatus');
//const networkMessages = require('./messages');

class AbstractNetworkComponent {
    returnError(res, status, prodErrorMessage, exception) {
        // message selection logic: if this is 'prod' or there is no exception,
        // then use prodErrorMessage, otherwise - exception (not a prod and got exception)
        return res
            .status(status)
            .end(returnStatus
                .errorResponse(isProd || !exception ? prodErrorMessage : exception.message)
            );
    }
}

module.exports = AbstractNetworkComponent;