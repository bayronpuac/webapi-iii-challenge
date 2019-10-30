// code away!
const server = require('./server.js');
const port = 7000;

server.listen(7000, () => {
  console.log(`\n* Server Running on ${port} *\n`);
});