const http = require('http');
const log = require('simple-node-logger').createSimpleLogger();
const App = require('./App');

class Server {
  static init(port) {
    return new Promise((resolve) => {
      this.server = new Server(port);
      resolve();
    });
  }

  static instance() {
    if (!this.server) {
      throw new Error('Server not initialized');
    }
    return this.server;
  }

  constructor(port) {
    this.port = port;
    this.httpServer = http.createServer(App.instance());
    this.server = null;
  }

  listen() {
    const options = {
      port: this.port,
    };

    return new Promise((resolve, reject) => {
      this.httpServer.listen(options, (error) => {
        if (error) {
          reject(error);
        } else {
          log.info('server started', options);
          resolve();
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.httpServer.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Server;
