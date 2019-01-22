require('./firebase/firebase');
const port = process.env.PORT || 5556;
const express = require("express");
const httpModule = require("http");
const path = require('path');
const axios = require('axios');
//const socket = require("socket.io");
const argv = require('yargs').argv;
// production is always better
const mode = argv.APP_MODE === 'development' ? 'development' : 'production';
console.log(`Node.js Server Mode: ${mode}`);
httpModule.globalAgent.options.ca = require('ssl-root-cas/latest').create();
var ServerReact = new ServerConstructor('react');
ServerReact.init();

function ServerConstructor() {
    var app;

    app = express();
    const http = httpModule.Server(app);
    //socket(http);
    this.port = port;

    this.init = function () {
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
    };

    this.indexPage = function (req, res) {
        this.type === res.render("index", {
            title: "Weather app",
            env: {
                isProd: mode === 'production'
            }
        });
    };

    this.setupPaths = function () {
        app.set("view engine", "jade");
        app.set('views', path.join(__dirname, 'views'));
        app.use(express.static("dist"));

        app.get("/place", this.handleGetWeatherByPlace.bind(this));

        app.get("/", this.indexPage.bind(this));
    };

    this.handleGetWeatherByPlace = function(req, initialResponse) {
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
    };
}