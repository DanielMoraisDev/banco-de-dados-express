import getLivros from "./getLivros.js"
import createLivro from "./createLivro.js"
import getLivro from "./getLivro.js"
import updateLivro from "./updateLivro.js"
import deleteLivro from "./deleteLivro.js"

import "../../models/livroModel.js"

const livrosController = {
    getLivros: getLivros,
    createLivro: createLivro,
    getLivro: getLivro,
    updateLivro: updateLivro,
    deleteLivro: deleteLivro
}

export default livrosController