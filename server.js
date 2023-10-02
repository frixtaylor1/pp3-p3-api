const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const connection = require("./db/db");

const StartPreinscriptionController = require("./controllers/startPreinscriptionController");
const ConfirmPreinscriptionController = require("./controllers/confirmPreinscriptionController");
const CancelPreinscriptionController = require("./controllers/cancelPreinscriptionController");

app.post("/startPreinscription", StartPreinscriptionController.handleRequest);
app.post(
  "/confirmPreinscription",
  ConfirmPreinscriptionController.handleRequest
);
app.post("/cancelPreinscription", CancelPreinscriptionController.handleRequest);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
