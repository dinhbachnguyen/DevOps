var redis = require("redis");
const configure = require('./configure')

const config = configure()
var db = redis.createClient({
  host:  process.env.REDIS_HOST || config.redis.host,
  port:  process.env.REDIS_PORT || config.redis.port,
  retry_strategy: (options) => {
    if (options.attempt > 15) {
        // End reconnecting with built in error
        return undefined;
    }
    if (options.error && (options.error.code === 'ECONNREFUSED' || options.error.code === 'NR_CLOSED')) {
        // Try reconnecting after 5 seconds
        console.error('The server refused the connection. Retrying connection...');
        return 5000;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
});

process.on('SIGINT', function() {
  client.quit();
});

process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
