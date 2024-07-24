import conn from "../../config/conn.js";
import { table_mysql } from "../../models/motoristaModel.js";

const getMotorista = (req, res) => {
  const { id } = req.params;

  const sql = /*sql*/ `
    SELECT * FROM ${table_mysql} 
    WHERE ?? = ?
    `;

  const sqlData = ["motorista_id", id];

  conn.query(sql, sqlData, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao buscar o motorista" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ sql })[0]}] ` + err
      );
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Motorista não encontrado" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ sql })[0]}] ` + err
      );
    }

    res.json({ message: "Motorista encontrado", data });
  });
};

export default getMotorista;
