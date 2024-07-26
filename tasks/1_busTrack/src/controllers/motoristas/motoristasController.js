import createMotorista from "./createMotorista.js";
import getMotoristas from "./getMotoristas.js";
import getMotorista from "./getMotorista.js";
import deleteMotorista from "./deleteMotorista.js";

import "../../models/motoristaModel.js";

const motoristasController = {
  createMotorista: createMotorista,
  getMotoristas: getMotoristas,
  getMotorista: getMotorista,
  deleteMotorista: deleteMotorista
};

export default motoristasController;
