import conn from "../../config/conn.js";
import { table_mysql as onibusTable } from "../../models/onibusModel.js";
import { table_mysql as linhasDeOnibusTable } from "../../models/linhaDeOnibusModel.js";
import { table_mysql as motoristasTable } from "../../models/motoristaModel.js";

const getOnibus = (req, res) => {
    const { id } = req.params;

    const sql = /*sql*/ `
    SELECT ${onibusTable}.*, ${linhasDeOnibusTable}.*, ${motoristasTable}.*
    FROM ${onibusTable}
    INNER JOIN ${linhasDeOnibusTable} ON  ${onibusTable}.?? = ${linhasDeOnibusTable}.??
    INNER JOIN ${motoristasTable} ON  ${onibusTable}.?? = ${motoristasTable}.??
    WHERE  ${onibusTable}.?? = ?
    `;

    const sqlData = ["id_linha", "linha_de_onibus_id", "id_motorista", "motorista_id", "onibus_id", id];

    conn.query(sql, sqlData, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Erro ao buscar o ônibus" });
            return console.log(
                `[${onibusTable}] [${Object.keys({ sql })[0]}] ` + err
            );
        }

        if (data.length === 0) {
            res.status(404).json({ message: "Ônibus não encontrado" });
            return console.log(
                `[${onibusTable}] [${Object.keys({ sql })[0]}] ` + err
            );
        }

        const onibus = {
            id: data[0].onibus_id,
            placa: data[0].placa,
            modelo: data[0].modelo,
            ano: data[0].ano,
            linhas: {
                nome_linha: data[0].nome_linha,
                numero_linhas: data[0].numero_linhas,
                itinerario: data[0].itinerario
            },
            motoristas: {
                nome: data[0].nome,
                data_nascimento: data[0].data_nascimento,
                numero_carteira_habilitacao: data[0].numero_carteira_habilitacao
            }
        }

        res.json({ message: "Ônibus encontrado", onibus });
    });
};

export default getOnibus;