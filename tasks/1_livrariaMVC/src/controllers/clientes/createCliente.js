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
  
    const checkSql = /*sql*/ `
          SELECT * FROM clientes
          WHERE email = "${email}"
      `;
  
    conn.query(checkSql, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar o cliente" });
        return console.log("[CLIENTES POST FAIL] " + err);
      }
  
      if (data.length > 0) {
        res.status(500).json({ message: "Cliente já existente" });
        return console.log("[CLIENTES POST FAIL] " + err);
      }
  
      const id = generateID();
  
      const insertSql = /*sql*/ `
          INSERT INTO clientes 
          (id, nome, email, senha, imagem)
          VALUES (
              "${id}",
              "${nome}",
              "${email}",
              "${senha}",
              "${imagem}"
              )
          `;
  
      conn.query(insertSql, (err, data) => {
        if (err) {
          res.status(500).json({ message: "Error ao cadastrar o cliente" });
          return console.log("[CLIENTES POST FAIL] " + err);
        }
  
        res.status(201).json({ message: "Cliente cadastrado" });
      });
    });
}

export default createCliente