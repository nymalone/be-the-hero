const express = require("express");

const SessionController = require("./controllers/SessionController");
const ProfileController = require("./controllers/ProfileController");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");


const routes = express.Router();

// LOGIN
routes.post("/sessions", SessionController.create);

// LISTAR ONG
routes.get("/ongs", OngController.index);
// CADASTRO ONG
routes.post("/ongs", OngController.create);

// PROFILE 
routes.get("/profile", ProfileController.index);

// LISTAR INCIDENT
routes.get("/incidents", IncidentController.index);
// CADASTRO INCIDENT
routes.post("/incidents", IncidentController.create);
// DELETE INCIDENT
routes.delete("/incidents/:id", IncidentController.delete);



module.exports = routes;
