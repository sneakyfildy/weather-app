const _ = require('lodash');
//
const AbstractNetworkComponent = require('./AbstractNetworkComponent');
const returnStatus = require('./returnStatus');
const networkMessages = require('./messages');
const DatabaseInterface = require('../data/FirebaseInterface');

class AbstractAPI extends AbstractNetworkComponent {
    constructor(cfg) {
        super();
        this.apiName = cfg.apiName;
        this.dbi = new DatabaseInterface(this.apiName);
    }

    init(expressApp) {
        // GET
        expressApp.get(`/api/${this.apiName}`, this.handleApiRequest.bind(this, this.networkGet));
        // CREATE
        expressApp.post(`/api/${this.apiName}`, this.handleApiRequest.bind(this, this.networkPost));
        // CLEAR
        expressApp.delete(`/api/${this.apiName}`, this.handleApiRequest.bind(this, this.networkDelete));
    }

    handleApiRequest(handlerFn, req, res) {
        res.setHeader('Content-Type', 'application/json');
        handlerFn.call(this, req, res);
    }

    networkGet (req, res) {
        //console.log('GET', req.body, req.params, req.query);
        try {
            this._commonGet(req.query)
                .then((snapshot) => {
                    let val = snapshot.val();
                    let arr = [];
                    snapshot.forEach((snapshotItem) => {
                        arr.push({
                            __key__: snapshotItem.key,
                            ...snapshotItem.val()
                        });
                    });
                    //console.log('snapshot', val, arr);
                    res.end(returnStatus.successResponse(arr));
                })
                .catch((err) => {
                    this.returnError(res, 500, 'Something went wrong adding new data', err);
                });
        } catch(err) {
            this.returnError(res, 500, 'Something went wrong adding new data', err);
        }
    }

    _commonGet (query) {
        return this.dbi.getItems(query);
    }

    networkPost (req, res) {
        //console.log('POST', req.body);
        try {
            let data = req.body && req.body.data;
            if (!data) {
                this.returnError(res, 500, 'No "data" received',
                    {message: 'No "data" received; body:' + JSON.stringify(req.body)});
            }

            return this._commonPost(_.castArray(data))
                .then( () => res.end(returnStatus.successResponse()) );
        } catch(err) {
            this.returnError(res, 500, 'Something went wrong adding new data', err);
        }
    }

    _commonPost (items) {
        return this.dbi.addItems(items);
    }

    networkDelete (req, res) {
        try {
            return this._commonDelete()
                .then(() => res.end(returnStatus.successResponse()));
        } catch(err) {
            this.returnError(res, 500, 'Something went wrong clearing all data', err);
        }
    }
    _commonDelete () {
        return this.dbi.clear();
    }
}

module.exports = AbstractAPI;