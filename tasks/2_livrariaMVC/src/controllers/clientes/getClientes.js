import conn from "../../config/conn.js";

const getClientes = (req, res) => {
    const sql = "SELECT * FROM clientes";

    conn.query(sql, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar os clientes" });
        return console.log("[CLIENTE GET FAIL]" + err);
      }
  
      const clientes = data;
      console.log(typeof clientes);
      res.json({ message: clientes });
    })
};

export default getClientes;
