import getClientes from "./getClientes.js"
import createCliente from "./createCliente.js"
import getCliente from "./getCliente.js"
import updateCliente from "./updateCliente.js"
import deleteCliente from "./deleteCliente.js"

import "../../models/clienteModel.js"

const clientesController = {
    getClientes: getClientes,
    createCliente: createCliente,
    getCliente: getCliente,
    updateCliente: updateCliente,
    deleteCliente: deleteCliente
}

export default clientesController