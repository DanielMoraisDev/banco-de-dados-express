import conn from "../../config/conn.js"

const getLivros = (req, res) => {
    const sql = /*sql*/ `
        SELECT * FROM livros
    `

    conn.query(sql, (err, data) => {
        if(err) {
            res.status(500).json({message: "Erro ao buscar livros"})
            return 
        }

        const livros = data
        res.json({message: "Lista de livros:", livros})
    })
}

export default getLivros