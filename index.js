const app = require('./v1/src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('API REST iniciada');
});