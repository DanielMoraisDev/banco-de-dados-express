import conn from "../../config/conn.js";
import { table_mysql } from "../../models/motoristaModel.js";

const getMotoristas = (req, res) => {
    const sql = `SELECT * FROM ${table_mysql}`;

    conn.query(sql, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Erro ao buscar os motoristas" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ sql })[0]}] ` + err
      );
      }
  
      const motoristas = data;
      res.send({ message: motoristas });
    })
};

export default getMotoristas;
