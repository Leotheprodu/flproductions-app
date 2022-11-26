const path = require("path");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
const PUERTO = process.env.PORT || 5000;

const credentials={
  host:'localhost',
  user: 'root',
  password:'Lsound2022',
  database: 'flproductions'
}

// Hacer que node sirva los archivos de nuestro app React
app.use(express.static(path.resolve(__dirname, './dist')));

//si no tengo cors, debo usar esto
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); */


// Manejar las peticiones GET en la ruta /api
app.get("/api", (req, res) => {
  res.json({ message: "FLProductions" });
  
});
app.get("/api/artistas", (req, res) => {
  const connection = mysql.createConnection(credentials);
  connection.query('SELECT * FROM artistas', (error, result) =>{
    if(error) {
      res.status(500).send(error);
    }else {
      res.status(200).send(result);
    }
  });
});
app.get("/api/artistas/producciones", (req, res) => {
  const connection = mysql.createConnection(credentials);
  connection.query('SELECT * FROM producciones', (error, result) =>{
    if(error) {
      res.status(500).send(error);
    }else {
      res.status(200).send(result);
    }
  });
});

app.get("/api/servicios", (req, res) => {
  const connection = mysql.createConnection(credentials);
  connection.query('SELECT * FROM servicios', (error, result) =>{
    if(error) {
      res.status(500).send(error);
    }else {
      res.status(200).send(result);
    }
  });
});
app.get("/api/servicios/precios", (req, res) => {
  const connection = mysql.createConnection(credentials);
  connection.query('SELECT * FROM servicios_precios', (error, result) =>{
    if(error) {
      res.status(500).send(error);
    }else {
      res.status(200).send(result);
    }
  });
});
app.get("/api/servicios/limitaciones", (req, res) => {
  const connection = mysql.createConnection(credentials);
  connection.query('SELECT * FROM servicios_limitaciones', (error, result) =>{
    if(error) {
      res.status(500).send(error);
    }else {
      res.status(200).send(result);
    }
  });
});

/* app.get("/api/segundos", (req, res) =>{
  let segundos = 0
  setInterval(sumasegundos,1000)

  function sumasegundos(){
    segundos = segundos + 1
  }
  console.log(segundos);
  
  res.json({ segundos: `${segundos}` });
}) */

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});



app.listen(PUERTO, () => {
console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);

});