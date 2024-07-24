import conn from "../config/conn.js";

const table_mysql = 'linhas_de_onibus'

const tableLinhaOnibus = /*sql*/ `
    CREATE TABLE IF NOT EXISTS ${table_mysql} (
        linha_de_onibus_id VARCHAR(60) PRIMARY KEY,
        nome_linha VARCHAR(255) NOT NULL,
        numero_linha INT NOT NULL,
        itinerario VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

conn.query(tableLinhaOnibus, (err, result, field) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }

  console.log(`[${table_mysql}] Tabela criada`);
});

export {
  table_mysql
}