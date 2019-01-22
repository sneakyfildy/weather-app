const firebase = require('./firebase/firebase');
const isTest = process.env.NODE_ENV === 'test';
const port = isTest ? 6666 : (process.env.PORT || 5556);

const express = require("express");
const httpModule = require("http");
const path = require('path');
const axios = require('axios');
//const socket = require("socket.io");
const argv = require('yargs').argv;
const isProd = argv.APP_MODE === 'production';

console.log(`Node.js Server isProd: ${isProd}`);
httpModule.globalAgent.options.ca = require('ssl-root-cas/latest').create();
const bodyParser = require('body-parser');

const FirebaseDBI = require('./data/FirebaseDBI');
const returnStatus = require('./network/returnStatus');
const AbstractServer = require('./network/AbstractServer');

class ServerConstructor extends AbstractServer {
    constructor () {
        super();
        this.weatherApiMap = {
            GET: (req, res) => this.handleGetWeatherData(req, res),
            POST: (req, res) => this.handlePostWeatherData(req, res),
            DELETE: (req, res) => this.handleClearWeatherData(req, res)
        };

        this.weatherDbi = new FirebaseDBI(firebase, 'weather');
        this.app = express();
        const http = httpModule.Server(this.app);
        //socket(http);
        this.port = port;
        this.setupPaths();

//        socket.on("connection", function (socket) {
//            console.log("a user connected");
//            socket.on("disconnect", function () {
//                console.log("user disconnected");
//            });
//        });

        http.listen(this.port, () => {
            console.log("Server started; port: " + this.port);
        });

        return this;
    }

    indexPage (req, res) {
        this.type === res.render("index", {
            title: "Weather app",
            env: {
                isProd: isProd
            }
        });
    };

    setupPaths () {
        this.app.set("view engine", "jade");
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.use(express.static("dist"));
        this.app.use( bodyParser.json() );

        // GET
        this.app.get('/api/weather', this.handleApiRequest.bind(this, this.weatherApiMap.GET));
        // CREATE
        this.app.post('/api/weather', this.handleApiRequest.bind(this, this.weatherApiMap.POST));
        // CLEAR
        this.app.delete('/api/weather', this.handleApiRequest.bind(this, this.weatherApiMap.DELETE));

        this.app.get("/", this.indexPage.bind(this));
    }

    handleGetWeatherData (req, res) {
        console.log('GET', req.body, req.params, req.query);
        try {
            this.weatherDbi.getItems(req.query)
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
                    this.returnError(res, 500, 'Something went wrong adding new weather data', err);
                });
        } catch(err) {
            this.returnError(res, 500, 'Something went wrong adding new weather data', err);
        }
    }


    handlePostWeatherData (req, res) {
        console.log('POST', req.body);
        try {
            this.weatherDbi.addItem(req.body);
            res.end(returnStatus.successResponse());
        } catch(err) {
            this.returnError(res, 500, 'Something went wrong adding new weather data', err);
        }
    }

    handleClearWeatherData (req, res) {
        try {
            this.weatherDbi.clear();
            res.end(returnStatus.successResponse());
        } catch(err) {
            this.returnError(res, 500, 'Something went wrong clearing all weather data', err);
        }
    }

    returnError (res, status, prodErrorMessage, exception) {
       return res
           .status(status)
           .end( returnStatus.errorResponse(isProd ? prodErrorMessage : exception.message) );
    }


}

const backendInstance = new ServerConstructor();
module.exports = backendInstance;