const express = require('express');
const app = express();

const port = express.env.PORT || 4000;

app.listen(port);

app.get("/",(req,res) => {
    res.send("Todo ok por aqui bb");
});

console.log(`listen on port ${port} 🐱‍👓`);