const express = require("express");
const httpModule = require("http");
const path = require('path');
//const socket = require("socket.io");
const argv = require('yargs').argv;
// production is always better
const mode = argv.APP_MODE === 'development' ? 'development' : 'production';
console.log(`Mode: ${mode}`);
var ServerReact = new ServerConstructor('react');
ServerReact.init();

function ServerConstructor() {
    var app;

    app = express();
    const http = httpModule.Server(app);
    //socket(http);

    this.port = 5556;

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

    this.handleGetWeatherByPlace = function(req, res) {
//        FS.readFile(me.makeTsPath(), function(err, data) {
//            if (err) {
//                return console.log(err);
//            }
//            res.end(data);
//        });
        res.end('okay');
    };
}