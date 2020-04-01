// testes de integração: testam um fluxo de uma rota inteira de uma rota da aplicação, testam por completo uma funcionalidade da aplicação
// no caso de criação da ong eu precisaria ver se o retorno da minha API traz a minha ong, no front eu utilizo o axios, mas ele não é recomendado para testes, então uso a biblioteca SUPERTEST
// supertest -> consegue fazer as requisições http, ela tbm traz algumas validações a mais na hora de pegar o retorno da nossa API
const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "ADOCAT2",
        email: "contato@ong.com.br",
        whatsapp: "17996784887",
        city: "São Paulo",
        uf: "SP"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
