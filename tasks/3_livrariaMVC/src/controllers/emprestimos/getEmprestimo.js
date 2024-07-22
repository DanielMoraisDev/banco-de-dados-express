import conn from "../../config/conn.js";

const getEmprestimo = (req, res) => {
    const { id } = req.params;

    const sql = /*sql*/ `
    SELECT * FROM emprestimos
    WHERE ?? = ?
    `;

  const sqlData = ["emprestimo_id", id]
  
    conn.query(sql, sqlData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar emprestimos" });
        return;
      }
  
      if (data.length === 0) {
        res.status(404).json({ message: "Emprestimo não encontrado" });
        return;
      }
  
      res.json({ message: "Emprestimo encontrado", data });
    });
}

export default getEmprestimo