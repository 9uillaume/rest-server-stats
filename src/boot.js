
const App = require('./App');
const Server = require('./Server');
const PlaygroundClient = require('./db-clients/PlaygroundClient');

module.exports = async (port, databaseUrl) => {
  await PlaygroundClient.init(databaseUrl);
  await App.init();
  await Server.init(port);
  await Server.instance().listen();
};
