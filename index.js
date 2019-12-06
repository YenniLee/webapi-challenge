requestAnimationFrame('dotenv').config();
const server = require('./server.js');

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`******Server listening on port ${port}*****`)
});