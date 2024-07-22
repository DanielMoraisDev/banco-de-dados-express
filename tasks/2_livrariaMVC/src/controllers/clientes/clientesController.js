import getClientes from "./getClientes.js"
import createCliente from "./createCliente.js"
import getCliente from "./getCliente.js"
import updateCliente from "./updateCliente.js"
import deleteCliente from "./deleteCliente.js"

import "../../models/ClienteModel.js"

const ClientesController = {
    getClientes: getClientes,
    createCliente: createCliente,
    getCliente: getCliente,
    updateCliente: updateCliente,
    deleteCliente: deleteCliente
}

export default ClientesController