import entregaService from '../services/prodServ.service';
import Entrega from '../models/ProdServ'; // Verifica que el path sea correcto
import boom from '@hapi/boom';

// Obtener lista de todos los envíos
export const getAllEntregas = async (req, res, next) => {
    try {
        const entregasList = await entregaService.listAll();
        if (!entregasList || entregasList.length === 0) {
            return res.status(404).json({ message: 'No se encontraron envíos registrados.' });
        }
        return res.status(200).json(entregasList);
    } catch (error) {
        console.error('Error en getAllEntregas:', error);
        next(boom.internal(error.message));
    }
};

/* Obtener un envío específico por ID

export const getEntregaById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const entrega = await entregaService.findById(id);
        if (!entrega) {
            return res.status(404).json({ message: 'Envío no encontrado.' });
        }
        return res.status(200).json(entrega);
    } catch (error) {
        console.error('Error en getEntregaById:', error);
        next(boom.internal(error.message));
    }
}; */

// Crear un nuevo envío
export const createEntrega = async (req, res, next) => {
    try {
        const newEntrega = await entregaService.create(req.body);
        if (!newEntrega) {
            throw boom.badRequest('No se pudo crear el envío.');
        }
        res.status(201).json(newEntrega);
    } catch (error) {
        console.log(error);
        next(boom.internal(error.message));
    }
};



export const updateEntrega = async (req, res, next) => {
  try {
      const { IdInstitutoOK } = req.params;
      const updatedData = req.body;

      const updatedEntrega = await entregaService.updateByIdInstitutoOK(IdInstitutoOK, updatedData);

      if (!updatedEntrega) {
          return res.status(404).json({ message: 'Envío no encontrado.' });
      }

      return res.status(200).json({ 
          message: 'Envío actualizado exitosamente.', 
          updatedEntrega 
      });
  } catch (error) {
      console.error('Error en updateEntregaByIdInstitutoOK:', error);
      next(boom.internal(error.message));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { IdProdServOK } = req.params; // Obtener el ID del producto desde los parámetros
    const updatedData = req.body; // Obtener los datos actualizados desde el cuerpo de la solicitud

    // Actualizar el producto específico dentro de envios.productos
    const updatedEntrega = await Entrega.updateOne(
      { "envios.productos.IdProdServOK": IdProdServOK }, // Buscar por IdProdServOK
      {
        $set: {
          "envios.$[].productos.$[producto]": updatedData, // Actualizar los datos
        },
      },
      {
        arrayFilters: [
          { "producto.IdProdServOK": IdProdServOK }, // Filtro para el producto específico
        ],
        new: true, // Retornar el documento actualizado
      }
    );

    if (!updatedEntrega.modifiedCount) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    res.status(200).json({ message: "Producto actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { IdProdServOK } = req.params; // Obtener el ID del producto a eliminar

    const result = await Entrega.updateOne(
      { "envios.productos.IdProdServOK": IdProdServOK }, // Buscar el producto dentro de envios
      {
        $pull: { "envios.$[].productos": { IdProdServOK } }, // Eliminar el producto por ID
      }
    );

    if (!result.modifiedCount) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    res.status(200).json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    next(error);
  }
};


// Eliminar un envío por IdInstitutoOK
export const deleteEntregaByIdInstitutoOK = async (req, res, next) => {
    try {
      const { IdInstitutoOK } = req.params;
      const deletedEntrega = await entregaService.deleteByIdInstitutoOK(IdInstitutoOK);
      if (!deletedEntrega) {    
        return res.status(404).json({ message: 'Envío no encontrado.' });
      }
      return res.status(200).json({ message: 'Envío eliminado exitosamente.', deletedEntrega });
    } catch (error) {
      console.error('Error en deleteEntregaByIdInstitutoOK:', error);
      next(boom.internal(error.message));
    }  };


    // Obtener la info_ad de un IdInstitutoOK
export const getInfoAdByIdInstituto = async (req, res, next) => {
    try {
      const { idInstitutoOK } = req.params;
      
      // Buscar el registro por IdInstitutoOK
      const entrega = await Entrega.findOne({ IdInstitutoOK: idInstitutoOK }, { IdInstitutoOK: 1, info_ad: 1 });
      
      if (!entrega) {
        return res.status(404).json({ message: `No se encontró información para el IdInstitutoOK: ${idInstitutoOK}` });
      }
  
      // Retornar solo el IdInstitutoOK y la información de info_ad
      return res.status(200).json({
        IdInstitutoOK: entrega.IdInstitutoOK,
        info_ad: entrega.info_ad,
      });
    } catch (error) {
      console.error("Error al obtener la información adicional por IdInstitutoOK:", error);
      next(error);
    }
  };

  // Obtener todas las ID del Instituto con su info_ad
export const getAllInstitutesInfoAd = async (req, res, next) => {
  try {
    // Busca todas las entradas en la colección, pero solo selecciona los campos requeridos
    const entregas = await Entrega.find({}, { IdInstitutoOK: 1, info_ad: 1 });

    if (!entregas || entregas.length === 0) {
      return res.status(404).json({ message: "No se encontró información de institutos." });
    }

    // Devuelve las ID del Instituto y su info_ad
    return res.status(200).json(entregas);
  } catch (error) {
    console.error("Error al obtener la información de todos los institutos:", error);
    next(error);
  }
};


  // Obtener productos por IdInstitutoOK
export const getProductosByInstituto = async (req, res, next) => {
    const { IdInstitutoOK } = req.params;
    try {
        // Buscar todas las entregas asociadas al IdInstitutoOK
        const entregas = await Entrega.find({ IdInstitutoOK });

        // Si no hay entregas para el IdInstitutoOK, retorna un mensaje vacío
        if (!entregas || entregas.length === 0) {
            return res.status(404).json({
                message: `No se encontraron entregas para el instituto: ${IdInstitutoOK}`,
            });
        }

        // Extraer todos los productos asociados a los envíos
        const productos = entregas.flatMap((entrega) =>
            entrega.envios.flatMap((envio) => envio.productos)
        );

        // Si no hay productos, responde con un mensaje vacío
        if (productos.length === 0) {
            return res.status(404).json({
                message: `No se encontraron productos para el instituto: ${IdInstitutoOK}`,
            });
        }

        // Responder con la lista de productos
        res.status(200).json({
            IdInstitutoOK,
            productos,
        });
    } catch (error) {
        console.error("Error en getProductosByInstituto:", error);
        next(error);
    }
};

// Controlador: Obtener todos los productos
export const getAllProducts = async (req, res, next) => {
  try {
    const entregas = await Entrega.find({}, { IdInstitutoOK: 1, "envios.productos": 1 });
    if (!entregas.length) {
      return res.status(404).json({ message: "No se encontraron productos." });
    }

    const productosPorInstituto = entregas.map((entrega) => ({
      IdInstitutoOK: entrega.IdInstitutoOK,
      productos: entrega.envios.flatMap((envio) => envio.productos),
    }));

    return res.status(200).json(productosPorInstituto);
  } catch (error) {
    console.error("Error al obtener todos los productos:", error);
    next(error);
  }
};

// Obtener todas las entregas completas por IdInstitutoOK
export const getEntregasByInstituto = async (req, res, next) => {
    const { IdInstitutoOK } = req.params;

    try {
        // Buscar todas las entregas asociadas al IdInstitutoOK
        const entregas = await Entrega.find({ IdInstitutoOK });

        // Si no hay entregas para el IdInstitutoOK, retorna un mensaje vacío
        if (!entregas || entregas.length === 0) {
            return res.status(404).json({
                message: `No se encontraron entregas para el instituto: ${IdInstitutoOK}`,
            });
        }

        // Responder con todas las entregas completas
        res.status(200).json({
            IdInstitutoOK,
            entregas,
        });
    } catch (error) {
        console.error("Error en getEntregasByInstituto:", error);
        next(error);
    }
};

// Obtener envíos con el IdInstitutoOK en el nivel superior
export const getEnviosByInstitutoWithId = async (req, res, next) => {
    try {
      const { IdInstitutoOK } = req.params;
  
      // Buscar el documento correspondiente al IdInstitutoOK
      const data = await Entrega.findOne(
        { IdInstitutoOK },
        {
          IdInstitutoOK: 1, // Incluir solo el IdInstitutoOK
          "envios.IdDomicilioOK": 1,
          "envios.IdPaqueteriaOK": 1,
          "envios.IdTipoMetodoEnvio": 1,
          "envios.CostoEnvio": 1,
          _id: 0, // Excluir el campo _id del documento principal
        }
      );
  
      if (!data) {
        return res
          .status(404)
          .json({ message: `No se encontraron datos para el instituto ${IdInstitutoOK}.` });
      }
  
      // Construir la respuesta con el formato requerido
      const response = {
        IdInstitutoOK: data.IdInstitutoOK,
        envios: data.envios,
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error en getEnviosByInstitutoWithId:", error);
      next(error);
    }
  };

// Obtener todos los envíos agrupados por IdInstitutoOK
export const getAllEnvios = async (req, res, next) => {
  try {
    // Busca todos los registros en la base de datos
    const registros = await Entrega.find({}, { IdInstitutoOK: 1, envios: 1 });

    // Filtrar y estructurar la respuesta para cumplir con el formato solicitado
    const resultado = registros.map((registro) => ({
      IdInstitutoOK: registro.IdInstitutoOK,
      envios: registro.envios.map((envio) => ({
        IdDomicilioOK: envio.IdDomicilioOK,
        IdPaqueteriaOK: envio.IdPaqueteriaOK,
        IdTipoMetodoEnvio: envio.IdTipoMetodoEnvio,
        CostoEnvio: envio.CostoEnvio,
      })),
    }));

    // Retornar la respuesta estructurada
    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al obtener todos los envíos:", error);
    next(error);
  }
};


  
  // Obtener rastreos con el IdInstitutoOK en el nivel superior
export const getRastreosByInstituto = async (req, res, next) => {
    try {
      const { IdInstitutoOK } = req.params;
  
      // Buscar el documento correspondiente al IdInstitutoOK
      const data = await Entrega.findOne(
        { IdInstitutoOK },
        {
          IdInstitutoOK: 1, // Incluir solo el IdInstitutoOK
          "envios.rastreos": 1, // Incluir solo el campo rastreos dentro de envios
          _id: 0, // Excluir el campo _id del documento principal
        }
      );
  
      if (!data) {
        return res
          .status(404)
          .json({ message: `No se encontraron datos de rastreo para el instituto ${IdInstitutoOK}.` });
      }
  
      // Construir la respuesta con el formato requerido
      const response = {
        IdInstitutoOK: data.IdInstitutoOK,
        rastreos: data.envios.map((envio) => envio.rastreos), // Extraer solo rastreos
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error en getRastreosByInstituto:", error);
      next(error);
    }
  };

  // Obtener todos los rastreos de todos los institutos
  export const getAllRastreos = async (req, res, next) => {
    try {
      const envios = await Entrega.find(
        { "envios.rastreos": { $exists: true } },
        {
          IdInstitutoOK: 1,
          "envios.rastreos": 1,
        }
      );
  
      // Verifica que `envios` sea un array válido
      if (!envios || envios.length === 0) {
        return res.status(404).json({ message: "No se encontraron rastreos." });
      }
  
      // Genera un array plano donde cada rastreo es un objeto único
      const rastreosData = envios.flatMap((entrega) =>
        (entrega.envios || []).flatMap((envio) => {
          const rastreos = Array.isArray(envio.rastreos) ? envio.rastreos : [envio.rastreos].filter(Boolean);
  
          return rastreos.map((rastreo) => ({
            IdInstitutoOK: entrega.IdInstitutoOK,
            NumeroGuia: rastreo?.NumeroGuia || "Sin número de guía",
            IdRepartidorOK: rastreo?.IdRepartidorOK || "Sin ID de repartidor",
            NombreRepartidor: rastreo?.NombreRepartidor || "Sin nombre de repartidor",
            Alias: rastreo?.Alias || "Sin alias",
          }));
        })
      );
  
      console.log("Datos de rastreos procesados y enviados al cliente:", rastreosData); // Para depuración
      res.status(200).json(rastreosData);
    } catch (error) {
      console.error("Error al obtener todos los rastreos:", error);
      next(error);
    }
  };

//CRUD INFO ADD
//ADD 
// Agregar información adicional
export const addInfoAdicional = async (req, res, next) => {
  try {
    const { IdInstitutoOK } = req.params; // Obtener el ID del instituto desde los parámetros
    const { Etiqueta, Valor, Secuencia, Activo, FechaReg, UsuarioReg } = req.body; // Obtener datos del cuerpo de la solicitud

    // Buscar el documento correspondiente al ID del instituto
    const entrega = await Entrega.findOne({ IdInstitutoOK });

    if (!entrega) {
      return res
        .status(404)
        .json({ message: `No se encontró un registro con el ID Instituto: ${IdInstitutoOK}` });
    }

    // Crear el nuevo objeto de información adicional
    const nuevaInfoAdicional = {
      IdEtiqueta: Etiqueta,
      Etiqueta,
      Valor,
      Secuencia,
      detail_row: {
        Activo: Activo || "S",
        detail_row_reg: [
          {
            FechaReg: FechaReg || new Date(),
            UsuarioReg: UsuarioReg || "Sistema", // Usuario por defecto si no se proporciona
          },
        ],
      },
    };

    // Agregar el nuevo objeto a la lista de info_ad en el documento existente
    entrega.info_ad.push(nuevaInfoAdicional);

    // Guardar los cambios en la base de datos
    await entrega.save();

    // Responder con el nuevo objeto creado
    res.status(201).json({
      message: "Información adicional agregada correctamente.",
      infoAdicional: nuevaInfoAdicional,
    });
  } catch (error) {
    console.error("Error al agregar información adicional:", error);
    next(boom.internal(error.message));
  }
};

// Eliminar toda la información adicional por IdInstitutoOK
export const deleteInfoAdByInstitute = async (req, res) => {
  try {
    const { IdInstitutoOK } = req.params;

    // Buscar y actualizar el documento, eliminando la información adicional
    const updatedEntrega = await Entrega.findOneAndUpdate(
      { IdInstitutoOK },
      { $set: { info_ad: [] } }, // Vaciar el array de info_ad
      { new: true } // Retorna el documento actualizado
    );

    if (!updatedEntrega) {
      return res.status(404).json({
        message: `No se encontró información para el Instituto con ID: ${IdInstitutoOK}`,
      });
    }

    return res.status(200).json({
      message: "Información adicional eliminada correctamente.",
      updatedEntrega,
    });
  } catch (error) {
    console.error("Error al eliminar información adicional:", error);
    res.status(500).json({
      message: "Error interno del servidor.",
      error: error.message,
    });
  }
};

export const updateInfoAdByIdInstituto = async (req, res, next) => {
  try {
    const { IdInstitutoOK } = req.params; // ID del instituto desde los parámetros
    const { Etiqueta, Valor, Secuencia, Activo, FechaReg, UsuarioReg } = req.body; // Datos a actualizar

    // Buscar el documento por IdInstitutoOK
    const entrega = await Entrega.findOne({ IdInstitutoOK });

    if (!entrega) {
      return res.status(404).json({
        message: `No se encontró información para el Instituto con ID: ${IdInstitutoOK}`,
      });
    }

    // Actualizar todos los subdocumentos en info_ad
    entrega.info_ad.forEach((info) => {
      info.Etiqueta = Etiqueta || info.Etiqueta;
      info.Valor = Valor || info.Valor;
      info.Secuencia = Secuencia || info.Secuencia;
      info.detail_row.Activo = Activo || info.detail_row.Activo;
      info.detail_row.detail_row_reg[0].FechaReg =
        FechaReg || info.detail_row.detail_row_reg[0].FechaReg;
      info.detail_row.detail_row_reg[0].UsuarioReg =
        UsuarioReg || info.detail_row.detail_row_reg[0].UsuarioReg;
    });

    // Guardar los cambios
    await entrega.save();

    return res.status(200).json({
      message: "Información adicional actualizada correctamente.",
      updatedInfoAd: entrega.info_ad,
    });
  } catch (error) {
    console.error("Error al actualizar información adicional:", error);
    next(error);
  }
};




//APARTADO DE RASTREO
export const createRastreo = async (req, res, next) => {
  try {
    const {
      IdInstitutoOK,
      NumeroGuia,
      IdRepartidorOK,
      NombreRepartidor,
      Alias,
      Ubicacion,
      FechaRegistro,
      UsuarioRegistro,
    } = req.body;

    // Validar campos obligatorios
    if (
      !IdInstitutoOK ||
      !NumeroGuia ||
      !IdRepartidorOK ||
      !NombreRepartidor ||
      !Alias ||
      !Ubicacion ||
      !FechaRegistro ||
      !UsuarioRegistro
    ) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son obligatorios.' });
    }

    // Crear el nuevo rastreo
    const nuevoRastreo = {
      NumeroGuia,
      IdRepartidorOK,
      NombreRepartidor,
      Alias,
      Ubicacion,
      FechaRegistro,
      UsuarioRegistro,
    };

    // Verificar si existe el documento y que `envios` no esté vacío
    const instituto = await Entrega.findOne({ IdInstitutoOK });

    if (!instituto) {
      return res
        .status(404)
        .json({ message: `No se encontró el instituto con IdInstitutoOK: ${IdInstitutoOK}` });
    }

    // Si `envios` está vacío, agregar un objeto base
    if (instituto.envios.length === 0) {
      await Entrega.updateOne(
        { IdInstitutoOK },
        { $push: { envios: { rastreos: [] } } }
      );
    }

    // Ahora agregar el nuevo rastreo al primer objeto de `envios`
    const resultado = await Entrega.updateOne(
      { IdInstitutoOK, 'envios.0': { $exists: true } }, // Buscar que exista al menos un objeto en `envios`
      { $push: { 'envios.0.rastreos': nuevoRastreo } }
    );

    // Verificar si se modificó el documento
    if (!resultado.modifiedCount) {
      return res
        .status(500)
        .json({ message: 'No se pudo agregar el rastreo.' });
    }

    res.status(201).json({ message: 'Rastreo creado con éxito.', data: nuevoRastreo });
  } catch (error) {
    console.error('Error en createRastreo:', error);
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

// CRUD para la funcionalidad de envíos

// Obtener todas las IDs de Institutos con sus envíos
export const getAllInstitutesEnvios = async (req, res, next) => {
  try {
      const entregas = await Entrega.find({}, { IdInstitutoOK: 1, envios: 1 });
      if (!entregas || entregas.length === 0) {
          return res.status(404).json({ message: "No se encontraron envíos registrados." });
      }
      return res.status(200).json(entregas);
  } catch (error) {
      console.error("Error al obtener las IDs de Institutos con sus envíos:", error);
      next(error);
  }
};

// Agregar un envío para un Instituto específico
export const addEnvio = async (req, res, next) => {
  try {
      const { IdInstitutoOK } = req.params;
      const envioData = req.body;

      const entrega = await Entrega.findOne({ IdInstitutoOK });
      if (!entrega) {
          return res
              .status(404)
              .json({ message: `No se encontró un registro con el ID Instituto: ${IdInstitutoOK}` });
      }

      entrega.envios.push(envioData);
      await entrega.save();

      return res.status(201).json({
          message: "Envío agregado correctamente.",
          envio: envioData,
      });
  } catch (error) {
      console.error("Error al agregar envío:", error);
      next(error);
  }
};

// Eliminar todos los envíos de un Instituto específico
export const deleteEnviosByInstitute = async (req, res, next) => {
  try {
      const { IdInstitutoOK } = req.params;

      const entrega = await Entrega.findOneAndUpdate(
          { IdInstitutoOK },
          { $set: { envios: [] } },
          { new: true }
      );

      if (!entrega) {
          return res.status(404).json({
              message: `No se encontró información para el Instituto con ID: ${IdInstitutoOK}`,
          });
      }

      return res.status(200).json({
          message: "Todos los envíos eliminados correctamente.",
          updatedEntrega: entrega,
      });
  } catch (error) {
      console.error("Error al eliminar envíos:", error);
      next(error);
  }
};

// Actualizar los envíos de un Instituto específico
export const updateEnviosByInstitute = async (req, res, next) => {
  try {
      const { IdInstitutoOK } = req.params;
      const enviosData = req.body;

      const entrega = await Entrega.findOne({ IdInstitutoOK });

      if (!entrega) {
          return res.status(404).json({
              message: `No se encontró información para el Instituto con ID: ${IdInstitutoOK}`,
          });
      }

      entrega.envios = enviosData;
      await entrega.save();

      return res.status(200).json({
          message: "Envíos actualizados correctamente.",
          updatedEnvios: entrega.envios,
      });
  } catch (error) {
      console.error("Error al actualizar envíos:", error);
      next(error);
  }
};

//CHECHO
export const updateEntregaByIdInstitutoOK = async (req, res, next) => {
  try {
      const { IdInstitutoOK } = req.params; // Obtiene el parámetro de la URL
      const updatedData = req.body; // Obtiene los datos a actualizar del cuerpo de la solicitud

      const updatedEntrega = await entregaService.updateByIdInstitutoOK(IdInstitutoOK, updatedData);

      if (!updatedEntrega) {
          return res.status(404).json({ message: 'Envío no encontrado.' });
      }

      return res.status(200).json({ 
          message: 'Envío actualizado exitosamente.', 
          updatedEntrega 
      });
  } catch (error) {
      console.error('Error en updateEntregaByIdInstitutoOK:', error);
      next(boom.internal(error.message)); // Manejo de errores
  }
};
