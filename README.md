run webpack and nodemon, launch server and certain port (regular dev setup):
npm run watch

run tests once: npm run test
run tests and backend continiously, this will run a backend on another port,
npm run test:watch

My dev setup is to have both scripts running in different terminals:

npm run watch
npm run test:watch