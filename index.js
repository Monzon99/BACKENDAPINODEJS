const express = require('express');
const app = express();

const port = express.env.PORT || 4000;

app.listen(port);

console.log(`listen on port ${port} 🐱‍👓`);