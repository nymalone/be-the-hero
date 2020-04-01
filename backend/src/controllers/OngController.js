const generateUniqueId = require("../utils/generateUniqueId");
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const ongs = await connection("ongs").select("*"); // * = all

    return res.json(ongs);
  },
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUniqueId(); // separei essa função em um único arquivo pq se em algum outro lugar da aplicação eu tbm for precisar de um Id unico eu tenho esse codigo isolado em um unico lugar ---> mais fácil manutenção.

    //tabela que quero inserir dados
    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    //devolvo apenas o ID da ong pq quando a ong se cadastra ela precisa saber o ID cadastrado pra ela
    //é esse ID que a ong vai usar para se conectar dentro da aplicação
    return res.json({
      id
    });
  }
};
