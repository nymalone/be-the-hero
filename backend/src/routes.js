const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

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
routes.post(
  "/ongs",
  celebrate({
    //dentro do celebrate posso validar os parametros que vem das origens: query, route e body
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.create
); //celebrate() precisa vir antes do OngController, pq no express tudo segue um fluxo, se eu colocasse a validação depois do create primeiro ele iria fazer a criação da ong para depois validar os dados.

// PROFILE
routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

// LISTAR INCIDENT
routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.index
);

// CADASTRO INCIDENT
routes.post(
  "/incidents",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  IncidentController.create
);

// DELETE INCIDENT
routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

module.exports = routes;
