page controls:
 - "clear" buttons shall creal their corresponding DBs
 - "refill" clears all data (making requests to api/delete)
then fills cities and weather DBs, cities have predefined set of items,
weather DB is filled with a random data (also spent a bunch of time on that)
- to choose a city focus a city input or clear it from any text
- click on a week day to open hourly view

How to build and run:
"npm run build" - builds with "production" webpack
"npm test" - tests one time
"npm run test:watch" - continiously runs tests (starting server on a random
port when needed and stopping afterwards, writes into test firebase DB)
"node server/server.js" - starts a server. Hopefully.
"npm run watch" - runs webpack, starts server, whatches for changes
I've used "npm run watch" + "npm run test:watch" during development

You will need two .env files - I will attach it to e-mail
put them in a root folder
github: https://github.com/sneakyfildy/weather-app
heroku: https://weather-app-sneakyfildy.herokuapp.com  


