import createMotorista from "./createMotorista.js";
import getMotoristas from "./getMotoristas.js";
import getMotorista from "./getMotorista.js";

import "../../models/motoristaModel.js";

const motoristasController = {
  createMotorista: createMotorista,
  getMotoristas: getMotoristas,
  getMotorista: getMotorista
};

export default motoristasController;
