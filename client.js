const fs = require('fs'),
    https = require('https');


let agentOptions = {
	key: fs.readFileSync('./certs/localhost/server.key'),
	cert: fs.readFileSync('./certs/localhost/server.crt'),
};

let agent = new https.Agent(agentOptions);

let requestOptions = {
	host: 'localhost',
	port: 8000,
	path: '/Gateway',
	method: 'GET',
	agent: agent,
	ca: fs.readFileSync('./certs/localhost/server.crt')
};

let req = https.request(requestOptions, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    console.log('got a response');
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
