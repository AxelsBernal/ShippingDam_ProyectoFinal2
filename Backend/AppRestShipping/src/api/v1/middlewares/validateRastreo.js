import Joi from "joi";
import boom from "@hapi/boom";

// Esquema de validación usando Joi
const rastreoSchema = Joi.object({
  IdInstitutoOK: Joi.string().required(),
  NumeroGuia: Joi.string().required(),
  IdRepartidorOK: Joi.string().required(),
  NombreRepartidor: Joi.string().required(),
  Alias: Joi.string().required(),
  Ubicacion: Joi.string().required(),
  FechaRegistro: Joi.date().iso().required(),
  UsuarioRegistro: Joi.string().required(),
});

// Middleware de validación
export const validateRastreo = async (req, res, next) => {
  try {
    // Valida los datos del cuerpo de la solicitud
    await rastreoSchema.validateAsync(req.body);
    next(); // Continúa si los datos son válidos
  } catch (error) {
    // Retorna un error si los datos no son válidos
    next(boom.badRequest(error.details[0].message));
  }
};
