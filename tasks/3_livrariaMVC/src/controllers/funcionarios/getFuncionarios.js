import conn from "../../config/conn.js";

const getFuncionarios = (req, res) => {
    const sql = "SELECT * FROM funcionarios";

    conn.query(sql, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar os funcionarios" });
        return console.log("[FUNCIONARIO GET FAIL]" + err);
      }
  
      const funcionarios = data;
      res.json({ message: funcionarios });
    })
};

export default getFuncionarios;
