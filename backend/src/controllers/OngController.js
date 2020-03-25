const crypto = require("crypto"); // posso usar um método para criar uma string de caracteres aleatórios
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const ongs = await connection("ongs").select("*"); // * = all

    return res.json(ongs);
  },
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString("HEX"); // vai gerar um ID com 4 hexadecimais aleatórios

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
