const path = require("path");
const express = require("express");


const app = express();
const PUERTO = process.env.PORT || 5000;

// Hacer que node sirva los archivos de nuestro app React
app.use(express.static(path.resolve(__dirname, './dist')));

// Manejar las peticiones GET en la ruta /api
app.get("/api", (req, res) => {
  res.json({ message: "FLProductions" });
});

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});


app.listen(PUERTO, () => {
console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);

});