import conn from "../../config/conn.js";

const updateCliente = (req, res) => {
  const { id } = req.params;
  const { nome, senha, email, imagem } = req.body;

  if (!nome) {
    res.status(500).send({ message: "O nome é obrigatório" });
    return;
  }

  if (!senha) {
    res.status(500).send({ message: "O senha é obrigatório" });
    return;
  }

  if (!email) {
    res.status(500).send({ message: "O email é obrigatório" });
    return;
  }

  if (!imagem) {
    res.status(500).send({ message: "A imagem é obrigatória" });
    return;
  }

  const sql = /*sql*/ `
    SELECT * FROM clientes 
    WHERE ?? = ?
  `;

  const checkSqlData = ["cliente_id", id];

  conn.query(sql, checkSqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar cliente" });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Cliente não encontrado" });
      return;
    }

    const checkEmailSql = /*sql*/ `
      SELECT * FROM clientes
        WHERE ?? != ? AND 
        ?? != ?
      `;

    const checkEmailSqlData = ["email", email, "cliente_id", id]

    conn.query(checkEmailSql, checkEmailSqlData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao verificar email" });
        return console.log("[CLIENTES PUT FAIL] " + err);
      }

      if (data.length > 0) {
        res
          .status(500)
          .json({ message: "Email já está sendo utilizado por outro cliente" });
        return console.log("[CLIENTES PUT FAIL] " + err);
      }
    });

    const updateSql = /*sql*/ `
    UPDATE clientes 
    SET ?? = ?,
    ?? = ?,
    ?? = ?,
    ?? = ?
    WHERE ?? = ?
  `;

  const updateSqlData = ["nome", nome, "senha", senha, "email", email, "imagem", imagem, "cliente_id", id]

    conn.query(updateSql, updateSqlData, (err) => {
      if (err) {
        console.log("[CLIENTES PUT FAIL] " + err);
        res.status(500).json({ message: "Erro ao atualizar Cliente" });
      }

      res.json({ message: "Cliente atualizado" });
    });
  });
};

export default updateCliente;
