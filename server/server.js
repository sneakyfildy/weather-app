const firebase = require('./firebase/firebase');
const isTest = process.env.NODE_ENV === 'test';
const port = isTest ? Math.floor(Math.random() * (20000 - 10000) + 10000) : (process.env.PORT || 5556);

const express = require('express');
const httpModule = require('http');
const path = require('path');
const axios = require('axios');
//const socket = require('socket.io');
const argv = require('yargs').argv;
const isProd = argv.APP_MODE === 'production';

console.log(`Node.js Server isProd: ${isProd}`, argv);
httpModule.globalAgent.options.ca = require('ssl-root-cas/latest').create();
const bodyParser = require('body-parser');

const returnStatus = require('./network/returnStatus');
const AbstractNetworkComponent = require('./network/AbstractNetworkComponent');
const AbstractAPI = require('./network/AbstractAPI');
const networkMessages = require('../server/network/messages');

class ServerConstructor extends AbstractNetworkComponent {
    constructor () {
        super();
        this.app = express();
        this.http = httpModule.Server(this.app);
        //socket(http);
        this.port = port;
        this.setupPaths();

//        socket.on('connection', function (socket) {
//            console.log('a user connected');
//            socket.on('disconnect', function () {
//                console.log('user disconnected');
//            });
//        });

        this.http.listen(this.port, () => {
            console.log('Server started; port: ' + this.port);
        });

        return this;
    }

    indexPage (req, res) {
        // will try to get city by IP
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //'194.15.118.79'
        if (ip.match(/^(([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)\.){3}([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)$/)) {
            // just the simplest regex, randomely found on SOF
            axios.get(`https://ipinfo.io/${ip}/`)
                .then((ipQueryResult) => {
                    this._renderIndex(res, ip, ipQueryResult.data.city);
                });
        } else {
            this._renderIndex(res);
        }


    };
    _renderIndex (res, ip, city) {
        res.render('index', {
            title: 'Weather app',
            env: {
                isProd: isProd, // todo: make not a global
                clientIp: ip || '',
                clientCity: city || ''
            }
        });
    }

    setupPaths () {
        this.app.set('view engine', 'jade');
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.use(express.static('dist'));
        this.app.use( bodyParser.json() );

        this.weatherAPI = new AbstractAPI({apiName: 'weather'});
        this.weatherAPI.init(this.app);

        this.cityAPI = new AbstractAPI({apiName: 'cities'});
        this.cityAPI.init(this.app);

        this.app.get('/api/*', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            this.returnError(res, 404, networkMessages.API_NOT_FOUND);
        });

        this.app.get('*', this.indexPage.bind(this));

    }
}

const backendInstance = new ServerConstructor();
module.exports = backendInstance;