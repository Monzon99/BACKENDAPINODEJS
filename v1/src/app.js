const express = require("express");
const app = express();
const serverless = require('serverless-http');
const morgan = require('morgan');
const cors = require('cors');
const {swaggerDocs: v1SwaggerDocs} = require('./swagger');
const PORT = process.env.PORT || 3000

const camionRoutes = require('./routes/camionRoutes');
const personalRoutes = require('./routes/personalRoutes');


//setting
app.set('port',PORT);
app.set('json spaces',2);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//routes
// app.use('/api/camion',camionRoutes);
// app.use('/api/personal',personalRoutes);
app.get('/', (req, res) => {
    // Envía el archivo HTML de bienvenida al cliente
    res.sendFile(__dirname + '/index.html');
  });

app.listen(app.get('port'), () =>{
    console.log(`🐱 server is running on PORT ${app.get('port')}. 🐱`);
    v1SwaggerDocs(app,PORT);
});

module.exports = app;