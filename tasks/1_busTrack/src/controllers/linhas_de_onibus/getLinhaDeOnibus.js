import conn from "../../config/conn.js";
import { table_mysql } from "../../models/linhaDeOnibusModel.js";

const getLinhaDeOnibus = (req, res) => {
  const { id } = req.params;

  const sql = /*sql*/ `
    SELECT * FROM ${table_mysql} 
    WHERE ?? = ?
    `;

  const sqlData = ["linha_de_onibus_id", id];

  conn.query(sql, sqlData, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao buscar a linha de ônibus" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ sql })[0]}] ` + err
      );
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Linha de ônibus não encontrada" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ sql })[0]}] ` + err
      );
    }

    res.json({ message: "Linha de ônibus encontrada", data });
  });
};

export default getLinhaDeOnibus;
