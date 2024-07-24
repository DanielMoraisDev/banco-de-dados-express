import conn from "../../config/conn.js";
import { table_mysql } from "../../models/linhaDeOnibusModel.js";

const getLinhasDeOnibus = (req, res) => {
  const sql = `SELECT * FROM ${table_mysql}`;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao buscar as linhas de onibus" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ sql })[0]}] ` + err
      );
    }

    const linhasDeOnibus = data;
    res.send({ message: linhasDeOnibus });
  });
};

export default getLinhasDeOnibus;
