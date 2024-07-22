import getFuncionarios from "./getFuncionarios.js"
import createFuncionario from "./createFuncionario.js"
import getFuncionario from "./getFuncionario.js"
import updateFuncionario from "./updateFuncionario.js"
import deleteFuncionario from "./deleteFuncionario.js"

import "../../models/FuncionarioModel.js"

const FuncionariosController = {
    getFuncionarios: getFuncionarios,
    createFuncionario: createFuncionario,
    getFuncionario: getFuncionario,
    updateFuncionario: updateFuncionario,
    deleteFuncionario: deleteFuncionario
}

export default FuncionariosController