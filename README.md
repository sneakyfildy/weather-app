run webpack and nodemon, launch server and certain port (regular dev setup):
npm run watch

run tests once: npm run test:backend
run tests and backend continiously, this will run a backend on another port,
also it will 'exit' node.js after tests finish:
npm run test:backend:watch

My dev setup is to have both scripts running in different terminals:

npm run watch
npm run test:backend:watch