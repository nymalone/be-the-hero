const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query; //query params que buscamos utilizando o "?""

    //retorna a quatidade de casos
    const [count] = await await connection("incidents").count(); //isso pode retornar mais de 1 incident e eu espero apenas 1 resultado, para pegar apenas a primeira posição do array eu utilizo []

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id") //para relacionar dados de duas tabelas...isso me retorna no front todos os dados da ong relacionado a aquele incident
      .limit(5)
      .offset((page - 1) * 5) //paginação
      .select([
        "incidents.*", // * = all
        "ongs.name", // dessa forma eu seleciono somente os dados que eu quero da ONG (assim o ID não sobrepõe)
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]); 

    res.header("X-Total-Count", count["count(*)"]);
    return res.json(incidents);
  },
  async create(req, res) {
    const { title, description, value } = req.body; // o id gera automátio por conta do increment que utilizamos
    //traz informações do contexto da nossa requisição, ex: dados de autenticação do usuário, localização, idioma...
    const ong_id = req.headers.authorization;

    //o primeiro valor desse array vai ser armazenado em uma variável chamada id
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  },

  async delete(req, res) {
    //id do incident
    const { id } = req.params;
    //id da ong p/ verificação
    const ong_id = req.headers.authorization;

    // where -> verifica se o id da ong é o que consta no incident
    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: "Operation not permited." });
    }
    await connection("incidents")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};
