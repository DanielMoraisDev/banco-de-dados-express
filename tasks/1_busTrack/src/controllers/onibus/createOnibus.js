import { v4 as generateID } from "uuid";
import { table_mysql } from "../../models/onibusModel.js";
import conn from "../../config/conn.js";

const createMotorista = (req, res) => {
  const { placa, modelo, ano_fabricacao, capacidade, id_linha, id_motorista } =
    req.body;

  const idSql = "onibus_id";

  if (!placa) {
    res.status(500).send({ message: "A placa é obrigatória" });
    return;
  }

  if (!modelo) {
    res.status(500).send({ message: "O modelo é obrigatório" });
    return;
  }

  if (!ano_fabricacao) {
    res.status(500).send({ message: "O ano de fabricação é obrigatório" });
    return;
  }

  if (!capacidade) {
    res.status(500).send({ message: "A capacidade é obrigatória" });
    return;
  }

  if (!id_linha) {
    res.status(500).send({ message: "O id da linha é obrigatório" });
    return;
  }

  if (!id_motorista) {
    res.status(500).send({ message: "O id do motorista é obrigatório" });
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
      res.status(500).json({ message: "Erro ao buscar o onibus" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ checkSql })[0]}] ` + err
      );
    }

    if (data.length > 0) {
      res.status(500).json({ message: "Onibus já existente" });
      return console.log(
        `[${table_mysql}] [${Object.keys({ checkSql })[0]}] ` + err
      );
    }

    const checkLinhaDeOnibus = /*sql*/ `
        SELECT * FROM linhas_de_onibus
        WHERE ?? = ?
    `;

    const checkLinhaDeOnibusData = ["linha_de_onibus_id", id_linha]

    conn.query(checkLinhaDeOnibus, checkLinhaDeOnibusData, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Erro ao buscar a linha de onibus" });
            return console.log(
              `[${table_mysql}] [${Object.keys({ checkLinhaDeOnibus })[0]}] ` + err
            );
          }
      
          if (data.length == 0) {
            res.status(500).json({ message: "A linha não existe" });
            return console.log(
              `[${table_mysql}] [${Object.keys({ checkLinhaDeOnibus })[0]}] ` + err
            );
          }
    })

    const checkMotorista = /*sql*/ `
        SELECT * FROM motoristas
        WHERE ?? = ?
    `;

    const checkMotoristaData = ["motorista_id", id_motorista]

    conn.query(checkMotorista, checkMotoristaData, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Erro ao buscar o motorista" });
            return console.log(
              `[${table_mysql}] [${Object.keys({ checkLinhaDeOnibus })[0]}] ` + err
            );
          }
      
          if (data.length == 0) {
            res.status(500).json({ message: "O motorista não existe" });
            return console.log(
              `[${table_mysql}] [${Object.keys({ checkLinhaDeOnibus })[0]}] ` + err
            );
          }
    })

    const insertSql = /*sql*/ `
        INSERT INTO ${table_mysql} 
        (??, ??, ??, ??, ??, ??, ??)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)
    `;

    const insertSqlData = [
      idSql,
      Object.keys({ placa })[0],
      Object.keys({ modelo })[0],
      Object.keys({ ano_fabricacao })[0],
      Object.keys({ capacidade })[0],
      Object.keys({ id_linha })[0],
      Object.keys({ id_motorista })[0],
      id,
      placa,
      modelo,
      ano_fabricacao,
      capacidade,
      id_linha,
      id_motorista,
    ];

    conn.query(insertSql, insertSqlData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Error ao cadastrar ônibus" });
        return console.log(
          `[${table_mysql}] [${Object.keys({ insertSql })[0]}] ` + err
        );
      }

      res.status(201).send({ message: "Ônibus cadastrado" });
    });
  });
};

export default createMotorista;
