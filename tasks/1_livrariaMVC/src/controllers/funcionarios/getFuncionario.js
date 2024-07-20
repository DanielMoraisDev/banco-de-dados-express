import conn from "../../config/conn.js";

const getFuncionario = (req, res) => {
    const { id } = req.params;

    const sql = /*sql*/ `
    SELECT * FROM funcionarios 
    WHERE id = "${id}"
    `;
  
    conn.query(sql, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar funcionarios" });
        return;
      }
  
      if (data.length === 0) {
        res.status(404).json({ message: "Funcionario não encontrado" });
        return;
      }
  
      res.json({ message: "Funcionario encontrado", data });
    });
}

export default getFuncionario