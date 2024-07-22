import conn from "../../config/conn.js";

const createEmprestimo = (req, res) => {
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
  });

  const insertSql = /*sql*/ `
          INSERT INTO emprestimos 
          ( ??, ??, ??)
          VALUES (
              ?,
              ?,
              ?
              );
          `;

  const insertSqlData = [
    "data_devolucao",
    "cliente_id",
    "livro_id",
    data_devolucao,
    cliente_id,
    livro_id,
  ];

  conn.query(insertSql, insertSqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error ao cadastrar o emprestimo" });
      return console.log("[EMPRESTIMOS POST FAIL] " + err);
    }

    res.status(201).json({ message: "Emprestimo cadastrado" });
  });
};

export default createEmprestimo;
