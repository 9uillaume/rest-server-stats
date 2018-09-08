const promise = require('bluebird');
const log = require('simple-node-logger').createSimpleLogger();
const pgp = require('pg-promise')({ promiseLib: promise });


let playgroundClient;

module.exports = class PlaygroundClient {
  static init(databaseUrl) {
    log.info('init playground database connection');
    return new Promise((resolve) => {
      playgroundClient = new PlaygroundClient(databaseUrl);
      resolve();
    });
  }

  static instance() {
    if (!playgroundClient) {
      throw new Error('PlaygroundClient not initialized');
    }
    return playgroundClient;
  }

  constructor(databaseUrl) {
    this.db = pgp(databaseUrl);
  }

  createLocation(newLocation) {
    return this.db.none(
      'insert into locations(name)' +
      'values(${name})',
      newLocation);
  }

  getLocations() {
    return this.db.any('select * from locations');
  }
};
