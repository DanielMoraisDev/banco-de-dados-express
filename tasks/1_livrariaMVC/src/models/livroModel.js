import conn from "./config/conn.js"

const tableLivros = /*sql*/ `
    CREATE TABLE IF NOT EXISTS livros (
        id VARCHAR(60) PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(255) NOT NULL,
        ano_publicacao YEAR(4) NOT NULL,
        genero VARCHAR(255) NOT NULL,
        disponibilidade BOOLEAN,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPTADE CURRENT_TIMESTAMP
    )
`

conn.query(tableLivros, (err, result, field) => {
    if(err) {
        console.error("Error ao criar a tabela" + err.stack)
        return
    }

    console.log("Tabela criada")
})