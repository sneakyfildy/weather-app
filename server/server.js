const firebase = require('./firebase/firebase');
const port = process.env.PORT || 5556;
const express = require("express");
const httpModule = require("http");
const path = require('path');
const axios = require('axios');
//const socket = require("socket.io");
const argv = require('yargs').argv;
// production is always better
const mode = argv.APP_MODE === 'development' ? 'development' : 'production';
const isProd = mode === 'production';
console.log(`Node.js Server Mode: ${mode}`);
httpModule.globalAgent.options.ca = require('ssl-root-cas/latest').create();
const bodyParser = require('body-parser');

const FirebaseDBI = require('./data/FirebaseDBI');
const returnStatus = require('./network/returnStatus');
console.log(returnStatus);

class ServerConstructor {
    constructor () {
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

        // CREATE
        this.app.post('/api/weather', (req, res) => {
            this.handlePostWeatherData(req, res);
        });
        // CLEAR
        this.app.delete('/api/weather', (req, res) => {
            this.handleClearWeatherData(req, res);
        });

        this.app.get("/", this.indexPage.bind(this));
    }

    handlePostWeatherData (req, res) {
        console.log(req.body);
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

    handleGetWeatherByPlace (req, initialResponse) {
        axios.get('https://openweathermap.org/data/2.5/forecast/?appid=b6907d289e10d714a6e88b30761fae22&id=3104324&units=metric')
            .then((result) => {
                initialResponse.end(JSON.stringify(result.data));
            })
            .catch((result) => {
                console.log(result);
                initialResponse.status(500).end('no');
            })
            .then((result) => {
                initialResponse.status(500).end('no');
            });
    }

    returnError (res, status, prodErrorMessage, exception) {
       return res
           .status(status)
           .end( returnStatus.errorResponse(isProd ? prodErrorMessage : exception.message) );
    }


}

new ServerConstructor();