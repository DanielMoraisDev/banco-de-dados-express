import conn from "../../config/conn.js";

const getCliente = (req, res) => {
    const { id } = req.params;

    const sql = /*sql*/ `
    SELECT * FROM clientes 
    WHERE id = "${id}"
    `;
  
    conn.query(sql, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar clientes" });
        return;
      }
  
      if (data.length === 0) {
        res.status(404).json({ message: "Cliente não encontrado" });
        return;
      }
  
      res.json({ message: "Cliente encontrado", data });
    });
}

export default getCliente