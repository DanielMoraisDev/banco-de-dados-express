import conn from "../../config/conn.js";

const deleteCliente = (req, res) => {
  const { id } = req.params;

  const deleteSql = /*sql*/ `
    DELETE FROM clientes
    WHERE id = "${id}"
  `;

  conn.query(deleteSql, (err) => {
    if (err) {
      res.status(500).json({ message: "Erro ao deletar cliente" });
      return;
    }

    res.json({ message: "Cliente foi deletado" });
  });
};

export default deleteCliente;
