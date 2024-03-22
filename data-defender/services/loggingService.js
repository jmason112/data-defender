const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');
const { Client } = require('@elastic/elasticsearch');

const esTransportOpts = {
  level: 'info',
  client: new Client({
    node: 'http://192.168.2.168:9200', 
    auth: {
      username: 'elastic', 
      password: 'changeme' 
    }
  }),
  indexPrefix: 'data-defender-logs',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
};

const logger = winston.createLogger({
  transports: [
    new ElasticsearchTransport(esTransportOpts)
  ]
});

// Stream for morgan
logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};

logger.on('error', (error) => {
  console.error('Logging error:', error);
});

module.exports = logger;