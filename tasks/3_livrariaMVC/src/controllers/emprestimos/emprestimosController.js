import getEmprestimos from "./getEmprestimos.js"
import createEmprestimo from "./createEmprestimo.js"
import getEmprestimo from "./getEmprestimo.js"
import updateEmprestimo from "./updateEmprestimo.js"
import deleteEmprestimo from "./deleteEmprestimo.js"

import "../../models/emprestimoModel.js"

const emprestimosController = {
    getEmprestimos: getEmprestimos,
    createEmprestimo: createEmprestimo,
    getEmprestimo: getEmprestimo,
    updateEmprestimo: updateEmprestimo,
    deleteEmprestimo: deleteEmprestimo
}

export default emprestimosController