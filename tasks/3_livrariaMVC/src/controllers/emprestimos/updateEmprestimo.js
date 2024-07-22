import conn from "../../config/conn.js";

const updateEmprestimo = (req, res) => {
  const { id } = req.params;
  const { data_devolucao, cliente_id, livro_id } = req.body;

  if (!data_devolucao) {
    res.status(500).send({ message: "A data de devolução é obrigatória" });
    return;
  }

  if (!cliente_id) {
    res.status(500).send({ message: "O ID do cliente é obrigatório" });
    return;
  }

  if (!livro_id) {
    res.status(500).send({ message: "A ID do livro é obrigatória" });
    return;
  }

  const checkSqlCliente = /*sql*/ `
          SELECT * FROM clientes
          WHERE ?? = ?
      `;

  const checkSqlClienteData = ["cliente_id", cliente_id];

  conn.query(checkSqlCliente, checkSqlClienteData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar o cliente" });
      return console.log("[EMPRESTIMOS POST FAIL] " + err);
    }

    if (data.length === 0) {
      res.status(500).json({ message: "O cliente não existe" });
      return console.log("[EMPRESTIMOS POST FAIL] " + err);
    }
  });

  const checkSqlLivro = /*sql*/ `
          SELECT * FROM livros
          WHERE ?? = ?
      `;

  const checkSqlLivroData = ["livro_id", livro_id];

  conn.query(checkSqlLivro, checkSqlLivroData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar o livro" });
      return console.log("[EMPRESTIMOS POST FAIL] " + err);
    }

    if (data.length === 0) {
      res.status(500).json({ message: "O livro não existe" });
      return console.log("[EMPRESTIMOS POST FAIL] " + err);
    }

    const updateSql = /*sql*/ `
    UPDATE emprestimos 
    SET ?? = ?,
    ?? = ?,
    ?? = ?
    WHERE ?? = ?
  `;

  const updateSqlData = ["data_devolucao", data_devolucao, "cliente_id", cliente_id,  "livro_id", livro_id, "emprestimo_id", id]

    conn.query(updateSql, updateSqlData, (err) => {
      if (err) {
        console.log("[EMPRESTIMO PUT FAIL] " + err);
        res.status(500).json({ message: "Erro ao atualizar o emprestimo" });
      }

      res.json({ message: "Emprestimo atualizado" });
    });
  });
};

export default updateEmprestimo;
