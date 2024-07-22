import conn from "../../config/conn.js";

const getEmprestimos = (req, res) => {
    const sql = "SELECT * FROM emprestimos";

    conn.query(sql, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar os emprestimos" });
        return console.log("[EMPRESTIMOS GET FAIL]" + err);
      }
  
      const emprestimos = data;
      res.json({ message: emprestimos });
    })
};

export default getEmprestimos;
