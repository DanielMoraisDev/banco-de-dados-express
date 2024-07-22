import { v4 as generateID } from "uuid"
import conn from "../../config/conn.js";

const createCliente = (req, res) => {
    const { nome, email, senha, imagem } = req.body;

    if (!nome) {
      res.status(500).send({ message: "O nome é obrigatório" });
      return;
    }
  
    if (!email) {
      res.status(500).send({ message: "O email é obrigatório" });
      return;
    }
  
    if (!senha) {
      res.status(500).send({ message: "O senha é obrigatório" });
      return;
    }
  
    if (!imagem) {
      res.status(500).send({ message: "A imagem é obrigatória" });
      return;
    }

    const id = generateID();
  
    const checkSql = /*sql*/ `
          SELECT * FROM clientes
          WHERE ?? = ?
      `;

    const checkSqlData = ["cliente_id", id]
  
    conn.query(checkSql, checkSqlData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar o cliente" });
        return console.log("[CLIENTES POST FAIL] " + err);
      }
  
      if (data.length > 0) {
        res.status(500).json({ message: "Cliente já existente" });
        return console.log("[CLIENTES POST FAIL] " + err);
      }
  
      const insertSql = /*sql*/ `
          INSERT INTO clientes 
          (??, ??, ??, ??, ??)
          VALUES (
              ?,
              ?,
              ?,
              ?,
              ?
              )
          `;

      const insertSqlData = ["cliente_id", "nome", "senha", "email", "imagem", id, nome, senha, email, imagem]

      conn.query(insertSql, insertSqlData, (err, data) => {
        if (err) {
          res.status(500).json({ message: "Error ao cadastrar o cliente" });
          return console.log("[CLIENTES POST FAIL] " + err);
        }
  
        res.status(201).json({ message: "Cliente cadastrado" });
      });
    });
}

export default createCliente