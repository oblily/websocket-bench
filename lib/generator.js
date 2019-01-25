/*global module, require*/

var logger = require('./logger');

module.exports = {

  /**
   * Before connection (just for faye)
   * @param {client} client connection
   */
  beforeConnect : function (client) {
    // Your logic
    // By example
    // client.setHeader('Authorization', 'OAuth abcd-1234');
    // client.disable('websocket');
  },

  /**
   * on socket io connect
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  onConnect : function (client, done) {
    // Your logic
    // client.subscribe('/test', function() {});
    // 認証成功の通知を受け取る
    client.on('push_auth_ok', message => {
      logger.info('Get event <push_auth_ok> from server. message:' + message);
    })
    // SIM情報取得依頼の通知を受け取る
    client.on('push_siminfo_get', message => {
      //logger.info('Get event <push_siminfo_get> from server. message:' + message);
    })
    // FW情報取得依頼の通知を受け取る
    client.on('push_firmwareinfo_get', message => {
      //logger.info('Get event <push_firmwareinfo_get> from server. message:' + message);
    });
    // echoの返事イベント
    client.on('receipt', message => {
      //logger.info('Get event <receipt> from server. message:' + message);
    });
    done();
  },

  /**
   * send a message
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  sendMessage : function (client, done) {
    //logger.error('Not implement method sendMessage in generator');
    // Your logic
    //client.emit('test', { hello: 'world' });
    //client.publish('/test', { hello: 'world' });
    const message = 'hello, ' + new Date();
    logger.info('Send  event <echo> to server. message:' + message);
    client.emit('echo', message);
    done();
  }
};
