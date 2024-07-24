import { v4 as generateID } from "uuid";
import { table_mysql } from "../../models/linhaDeOnibusModel.js";
import conn from "../../config/conn.js";

const createLinhaDeOnibus = (req, res) => {
  const { nome_linha, numero_linha, itinerario } = req.body;

  const idSql = "linha_de_onibus_id"

  if (!nome_linha) {
    res.status(500).send({ message: "O nome da linha é obrigatório" });
    return;
  }

  if (!numero_linha) {
    res.status(500).send({ message: "O número da linha é obrigatório" });
    return;
  }

  if (!itinerario) {
    res.status(500).send({ message: "O itinerário é obrigatório" });
    return;
  }

  const id = generateID();

  const checkSql = /*sql*/ `
    SELECT * FROM ${table_mysql}
    WHERE ?? = ?
  `;

  const checkSqlData = [idSql, id, Object.keys({ nome_linha })[0], nome_linha];

  conn.query(checkSql, checkSqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar o linha de onibus" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ checkSql })[0]}] ` + err
      );
    }

    if (data.length > 0) {
      res.status(500).json({ message: "Linha de ônibus já existente" });
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
      Object.keys({ nome_linha })[0],
      Object.keys({ numero_linha })[0],
      Object.keys({ itinerario })[0],
      id,
      nome_linha,
      numero_linha,
      itinerario,
    ];

    conn.query(insertSql, insertSqlData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Error ao cadastrar linha de ônibus" });
        return console.log(
          `[${table_mysql}] [${Object.keys({ insertSql })[0]}] ` + err
        );
      }

      res.status(201).send({ message: "Linha de ônibus cadastrado" });
    });
  });
};

export default createLinhaDeOnibus;
