import conn from "../config/conn.js";

const table_mysql = 'onibus'

const tableOnibus = /*sql*/ `
    CREATE TABLE IF NOT EXISTS ${table_mysql} (
        onibus_id VARCHAR(60) PRIMARY KEY,
        placa VARCHAR(8) NOT NULL,
        modelo VARCHAR(255) NOT NULL,
        ano_fabricacao YEAR(4) NOT NULL,
        capacidade INT(5) NOT NULL,
        id_linha VARCHAR(60) NOT NULL,
        id_motorista VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (id_linha) REFERENCES linhas_de_onibus(linha_de_onibus_id),
        FOREIGN KEY (id_motorista) REFERENCES motoristas(motorista_id)
    )
`;

conn.query(tableOnibus, (err, result, field) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }

  console.log(`[${table_mysql}] Tabela criada`);
});

export {
  table_mysql
}