const fs = require('fs'),
    https = require('https'),
    url = require('url');


const options = {
	key: fs.readFileSync('./certs/localhost/server.key'),
	cert: fs.readFileSync('./certs/localhost/server.crt'),
	ca: fs.readFileSync('./certs/localhost/server.crt'), // authority chain for the clients
	requestCert: true, // ask for a client cert
	rejectUnauthorized: false, // act on unauthorized clients at the app level
};

var server = https.createServer(options, (req, res) => {
  var parsedURL = url.parse(req.url);

  if (parsedURL.pathname === '/Gateway' && req.method === 'GET') {
  	console.log('responding to request');
  	res.end('Hello World!!\n');
  }

  if (parsedURL.pathname === '/FromFSI' && req.method === 'POST') {
    console.log('response');
    console.log(req);
  }


});

server.on('connection', (c) => {console.log('insecure connection');});

server.on('secureConnection', (c) =>{console.log('secure connection; client authorized: ', c.authorized);});

server.listen(8000, () => {
	console.log('server listening on port 8000');
});
