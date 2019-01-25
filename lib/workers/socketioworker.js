/*global module, require*/
var io       = require('socket.io-client'),
  util       = require('util'),
  BaseWorker = require('./baseworker.js'),
  logger     = require('../logger.js');

/**
 * SocketIOWorker Worker class inherits form BaseWorker
 */
var SocketIOWorker = function (server, generator) {
  SocketIOWorker.super_.apply(this, arguments);
};

util.inherits(SocketIOWorker, BaseWorker);

const opts = {
  'force new connection': true,
  extraHeaders: {
    'access-token': '111111',
    'connect-source': '1',
    'connector-serial-no': 'A-0000000002',
    'recieve-number': '1'
  }
};

SocketIOWorker.prototype.createClient = function (callback) {
  var self = this;
  var client = io.connect(this.server, opts);

  client.on('connect', function () {
    callback(false, client);
  });

  client.on('connect_error', function (err) {
    if (self.verbose) {
      logger.error("SocketIO Worker connect_failed" + JSON.stringify(err));
    }
    callback(true, client);
  });

  client.on('error', function (err) {
    if (self.verbose) {
      logger.error("SocketIO Worker error: " + JSON.stringify(err));
    }
    callback(true, client);
  });
};

module.exports = SocketIOWorker;
