
import conn from "../../config/conn.js";
import { table_mysql as onibusTable } from "../../models/onibusModel.js";
import { table_mysql as linhasDeOnibusTable } from "../../models/linhaDeOnibusModel.js";
import { table_mysql as motoristasTable } from "../../models/motoristaModel.js";

const getAllOnibus = (req, res) => {
    const sql = /*sql*/ `
    SELECT ${onibusTable}.*, ${linhasDeOnibusTable}.*, ${motoristasTable}.*
    FROM ${onibusTable}
    INNER JOIN ${linhasDeOnibusTable} ON  ${onibusTable}.?? = ${linhasDeOnibusTable}.??
    INNER JOIN ${motoristasTable} ON  ${onibusTable}.?? = ${motoristasTable}.??
    `;

    const sqlData = ["id_linha", "linha_de_onibus_id", "id_motorista", "motorista_id"];

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

        const onibus = data.map((e) => (
                {
                    id: e.onibus_id,
                    placa: e.placa,
                    modelo: e.modelo,
                    ano: e.ano,
                    linhas: {
                        nome_linha: e.nome_linha,
                        numero_linhas: e.numero_linhas,
                        itinerario: e.itinerario
                    },
                    motoristas: {
                        nome: e.nome,
                        data_nascimento: e.data_nascimento,
                        numero_carteira_habilitacao: e.numero_carteira_habilitacao
                    }
                }
            )
        )

        res.json({ message: "Os ônibus foram encontrados", onibus });
    });
};

export default getAllOnibus;