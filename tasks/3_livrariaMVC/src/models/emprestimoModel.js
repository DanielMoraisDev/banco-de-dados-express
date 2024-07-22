import conn from "../config/conn.js"

const tableEmprestimos = /*sql*/ `
    CREATE TABLE IF NOT EXISTS emprestimos (
        emprestimo_id INT PRIMARY KEY AUTO_INCREMENT,
        data_emprestimo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data_devolucao DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        cliente_id VARCHAR(60),
        livro_id VARCHAR(60), 

        FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id),
        FOREIGN KEY (livro_id) REFERENCES livros(livro_id)
    )
`

conn.query(tableEmprestimos, (err, result, field) => {
    if(err) {
        console.error("Error ao criar a tabela" + err.stack)
        return
    }

    console.log("[emprestimos] Tabela criada")
})