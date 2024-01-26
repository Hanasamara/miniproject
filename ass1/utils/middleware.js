const morgan = require('morgan');

//Convert body to json file to exract content in morgan logger
morgan.token('req-body', (req) => JSON.stringify(req.body));
const logger = morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),//Request Type
      tokens.url(req, res),//URL
      tokens.status(req, res),//Status code
      tokens.res(req, res, 'content-length'), '-',//Response content length
      tokens['response-time'](req, res), 'ms',//Response time
      tokens['req-body'](req, res) //Request content being sent
    ].join(' ');
  });
  
  const unknownEndpoint = ((req, res, next) => {
    console.log('Unknown endpoint')
    res.send({ message: 'unknown endpoint'})
  })
  
  module.exports = {
    logger,
    unknownEndpoint
  }