const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
// sudo pkill -9 node
