import mysql from "mysql2";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sen@iDev77!.",
  database: "livraria",
  port: "3306",
});

const connectDB = async () => {
  conn.connect((err) => {
    if (err) {
      console.log("[DB FAIL] Error na conexão com o bando de dados, error", err.stack);
      return;
    }
    console.log("[DB] Banco de dados conectado com sucesso");
  });
};

export {
  connectDB, 
  conn
};
