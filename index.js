// code away!
const server = require('./server.js');
// the port is coming from the environment
const port = process.env.PORT || 7000;
// the PORT will be set by heroku when we deploy

server.listen(port, () => {
  console.log(`\n Server running on port ${port} \n`);
});