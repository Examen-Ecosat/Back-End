const app = require('./app');
const db = require('./database/db');
let port = process.env.PORT || 3000;

app.listen(port, (error) => {
    if (error) return console.log('Error al iniciar el servidor');
    console.log(`El servidor escucha en el puerto:`, port);
});