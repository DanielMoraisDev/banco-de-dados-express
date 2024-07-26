import createOnibus from "./createOnibus.js";
import getOnibus from "./getOnibus.js";
import getAllOnibus from "./getAllOnibus.js";

import "../../models/onibusModel.js";

const onibusControllers = {
  createOnibus: createOnibus,
  getOnibus: getOnibus,
  getAllOnibus: getAllOnibus
};

export default onibusControllers;
