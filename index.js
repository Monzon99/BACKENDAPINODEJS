const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // Envía el archivo HTML al cliente
    res.sendFile(__dirname + '/index.html');
  });

app.listen(process.env.PORT || 3000, () => {
  console.log('API REST iniciada');
});