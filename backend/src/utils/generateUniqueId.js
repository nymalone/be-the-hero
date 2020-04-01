const crypto = require("crypto"); // posso usar um método para criar uma string de caracteres aleatórios

// vai gerar um ID com 4 hexadecimais aleatórios
module.exports = function generateUniqueId () {
    return crypto.randomBytes(4).toString("HEX");
}