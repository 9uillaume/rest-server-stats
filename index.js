const boot = require('./src/boot');

const config = {
  port: 8989,
  databaseUrl: 'postgres://playground:ZBpamPnEUeQYEtPeYnn7HHDX@35.228.223.135:5432/playground',
};

boot(config.port, config.databaseUrl);
