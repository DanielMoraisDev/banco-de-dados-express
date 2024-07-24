import conn from "../config/conn.js";

const table_mysql = 'motoristas'

const tableMotorista = /*sql*/ `
    CREATE TABLE IF NOT EXISTS ${table_mysql} (
        motorista_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        numero_carteira_habilitacao VARCHAR(9) NOT NULL,
        data_nascimento DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

conn.query(tableMotorista, (err, result, field) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }

  console.log(`[${table_mysql}] Tabela criada`);
});

export {
  table_mysql
}