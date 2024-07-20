import { v4 as generateID } from "uuid"
import conn from "../../config/conn.js";

const createFuncionario = (req, res) => {
    const { nome, cargo, data_contratacao, email, salario } = req.body;

    if (!nome) {
      res.status(500).send({ message: "O nome é obrigatório" });
      return;
    }
  
    if (!cargo) {
      res.status(500).send({ message: "O cargo é obrigatório" });
      return;
    }
  
    if (!data_contratacao) {
      res.status(500).send({ message: "O data de contratação é obrigatório" });
      return;
    }
  
    if (!email) {
      res.status(500).send({ message: "O email é obrigatório" });
      return;
    }
  
    if (!salario) {
      res.status(500).send({ message: "O salário é obrigatório" });
      return;
    }
  
    const checkSql = /*sql*/ `
          SELECT * FROM funcionarios
          WHERE email = "${email}"
      `;
  
    conn.query(checkSql, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar o funcionario" });
        return console.log("[FUNCIONARIOS POST FAIL] " + err);
      }
  
      if (data.length > 0) {
        res.status(500).json({ message: "Funcionário já existente" });
        return console.log("[FUNCIONARIOS POST FAIL] " + err);
      }
  
      const id = generateID();
  
      const insertSql = /*sql*/ `
          INSERT INTO funcionarios 
          (id, nome, cargo, data_contratacao, email, salario)
          VALUES (
              "${id}",
              "${nome}",
              "${cargo}",
              "${data_contratacao}",
              "${email}",
              "${salario}"
              )
          `;
  
      conn.query(insertSql, (err, data) => {
        if (err) {
          res.status(500).json({ message: "Error ao cadastrar o funcionario" });
          return console.log("[FUNCIONARIOS POST FAIL] " + err);
        }
  
        res.status(201).json({ message: "Funcionario cadastrado" });
      });
    });
}

export default createFuncionario