
const App = require('./App');
const Server = require('./Server');
const pg = require('pg');

pg.connect('postgres://postgres:password@localhost:5432/practicedocker');

module.exports = async (port) => {
  await App.init();
  await Server.init(port);
  await Server.instance().listen();
};
