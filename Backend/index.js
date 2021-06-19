'use strict'

const app = require('./app');

//Variable para el puerto de la aplicación
const port = 3900;

app.listen(port, () => {
	console.log(`Server listening on ${port} port.`);
})