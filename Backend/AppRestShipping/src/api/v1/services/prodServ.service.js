
import Entrega from '../models/ProdServ';

class EntregaService {
    async listAll() {
        try {
            return await Entrega.find({});
        } catch (error) {
            throw error;
        }
    }

    async findById(entregaId) {
        try {
            return await Entrega.findById(entregaId);
        } catch (error) {
            throw error;
        }
    }

    async create(entregaData) {
        try {
            const entrega = new Entrega(entregaData);
            return await entrega.save();
        } catch (error) {
            throw error;
        }
    }

    async update(entregaId, entregaData) {
        try {
            return await Entrega.findByIdAndUpdate(entregaId, entregaData, { new: true });
        } catch (error) {
            throw error;
        }
    }

   // Eliminar un envío por IdInstitutoOK
async deleteByIdInstitutoOK(IdInstitutoOK) {
    try {
      return await Entrega.findOneAndDelete({ IdInstitutoOK });
    } catch (error) {
      throw error;
    }
  }

  // Obtener información adicional (info_ad) por IdInstitutoOK
async getInfoAdByIdInstituto(IdInstitutoOK) {
    try {
        return await Entrega.findOne(
            { IdInstitutoOK }, // Filtro por IdInstitutoOK
            { IdInstitutoOK: 1, info_ad: 1 } // Solo devuelve IdInstitutoOK e info_ad
        );
    } catch (error) {
        throw error;
    }
}

//cambios
async updateByIdInstitutoOK(IdInstitutoOK, updatedData) {
    try {
        // Usamos el método findOneAndUpdate para actualizar el documento por IdInstitutoOK
        return await Entrega.findOneAndUpdate(
            { IdInstitutoOK },   // Filtro por IdInstitutoOK
            { $set: updatedData }, // Datos a actualizar
            { new: true }          // Devuelve el documento actualizado
        );
    } catch (error) {
        throw error;
    }
}


  

  
}

export default new EntregaService();
