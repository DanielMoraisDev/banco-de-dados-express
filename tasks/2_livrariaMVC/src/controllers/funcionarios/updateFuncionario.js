import conn from "../../config/conn.js";

const updateFuncionario = (req, res) => {
  const { id } = req.params;
  const { nome, cargo, data_contratacao, email, salario } = req.body;

  if (!nome) {
    res.status(500).send({ message: "O nome é obrigatório" });
    return;
  }

  if (!cargo) {
    res.status(500).send({ message: "O cargo é obrigatório" });
    return;
  }

  if (!data_contratacao) {
    res.status(500).send({ message: "O data de contratação é obrigatório" });
    return;
  }

  if (!email) {
    res.status(500).send({ message: "O email é obrigatório" });
    return;
  }

  if (!salario) {
    res.status(500).send({ message: "O salário é obrigatório" });
    return;
  }

  const sql = /*sql*/ `
    SELECT * FROM funcionarios 
    WHERE ?? = ?
  `;

  const sqlData = ["funcionario_id", id];

  conn.query(sql, sqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar funcionario" });
      return;
    }

    if (data.length === 0) {
      res
        .status(404)
        .json({
          message: "Funcionario não encontrado ou o email já está cadastrado",
        });
      return;
    }

    const checkEmailSql = /*sql*/ `
      SELECT * FROM funcionarios
        WHERE ?? != ? AND 
        ?? != ?
      `;

    const checkEmailSqlData = ["email", email, "funcionario_id", id];

    conn.query(checkEmailSql, checkEmailSqlData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao verificar email" });
        return console.log("[FUNCIONARIOS PUT FAIL] " + err);
      }

      if (data.length > 0) {
        res
          .status(500)
          .json({
            message: "Email já está sendo utilizado por outro funcionário",
          });
        return console.log("[FUNCIONARIOS PUT FAIL] " + err);
      }
    });

    const updateSql = /*sql*/ `
    UPDATE funcionarios 
    SET ?? = ?,
    ?? = ?,
    ?? = ?,
    ?? = ?
    WHERE ?? = ?
  `;

    const updateSqlData = ["nome", nome, "cargo", cargo, "email", email, "salario", salario, "funcionario_id", id]

    conn.query(updateSql, updateSqlData, (err) => {
      if (err) {
        console.log("[FUNCIONARIOS PUT FAIL] " + err);
        res.status(500).json({ message: "Erro ao atualizar funcionario" });
      }

      res.json({ message: "Funcionario atualizado" });
    });
  });
};

export default updateFuncionario;
