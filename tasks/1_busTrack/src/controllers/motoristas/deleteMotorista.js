import conn from "../../config/conn.js";
import { table_mysql } from "../../models/motoristaModel.js";

const deleteMotorista = (req, res) => {
    const { id } = req.params;

    const sql = /*sql*/ `
         UPDATE onibus 
        SET id_motorista = NULL 
        WHERE id_motorista = ?
    `;

    const sqlData = [id]

    conn.query(sql, sqlData, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Erro ao buscar o motorista" });
            return console.log(
                `[${table_mysql}] [${Object.keys({ sql })[0]}] ` + err
            );
        }


        const deleteSql = /*sql*/ `
        DELETE FROM ${table_mysql} 
        WHERE motorista_id = ?
        `;

        const deleteData = [id];

        conn.query(deleteSql, deleteData, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Não foi possivel deletar o motorista" });
                return console.log(`
                    [${table_mysql}] [${Object.keys({ deleteSql })[0]}]  + err
                    `
                );
            }

            res.json({ message: "Motorista deletado" });
        });

    });
};

export default deleteMotorista;