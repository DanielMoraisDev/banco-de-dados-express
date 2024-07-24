import { v4 as generateID } from "uuid";
import { table_mysql } from "../../models/motoristaModel.js";
import conn from "../../config/conn.js";

const createMotorista = (req, res) => {
  const { nome, numero_carteira_habilitacao, data_nascimento } = req.body;

  const idSql = "motorista_id"

  if (!nome) {
    res.status(500).send({ message: "O nome é obrigatório" });
    return;
  }

  if (!numero_carteira_habilitacao) {
    res.status(500).send({ message: "O número da carteira de habilitação é obrigatório" });
    return;
  }

  if (!data_nascimento) {
    res.status(500).send({ message: "A data de nascimento é obrigatória" });
    return;
  }

  const id = generateID();

  const checkSql = /*sql*/ `
    SELECT * FROM ${table_mysql}
    WHERE ?? = ?
  `;

  const checkSqlData = [idSql, id];

  conn.query(checkSql, checkSqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar o motorista" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ checkSql })[0]}] ` + err
      );
    }

    if (data.length > 0) {
      res.status(500).json({ message: "Motorista já existente" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ checkSql })[0]}] ` + err
      );
    }

    const insertSql = /*sql*/ `
        INSERT INTO ${table_mysql} 
        (??, ??, ??, ??)
        VALUES 
        (?, ?, ?, ?)
    `;

    const insertSqlData = [
      idSql,
      Object.keys({ nome })[0],
      Object.keys({ numero_carteira_habilitacao })[0],
      Object.keys({ data_nascimento })[0],
      id,
      nome,
      numero_carteira_habilitacao,
      data_nascimento,
    ];

    conn.query(insertSql, insertSqlData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Error ao cadastrar motorista" });
        return console.log(
          `[${table_mysql}] [${Object.keys({ insertSql })[0]}] ` + err
        );
      }

      res.status(201).send({ message: "Motorista cadastrado" });
    });
  });
};

export default createMotorista;
