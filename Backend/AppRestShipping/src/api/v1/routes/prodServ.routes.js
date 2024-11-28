// Shipping
import { Router } from 'express';
import * as entregaController from '../controllers/prodserv.controller';
import { validateRastreo } from "../middlewares/validateRastreo";
const router = Router();

// Ruta para obtener la lista de todos los envíos
router.get('/', entregaController.getAllEntregas);

/* Ruta para obtener un envío específico por ID

router.get('/:id', entregaController.getEntregaById); */

// Ruta para crear un nuevo envío
router.post('/', entregaController.createEntrega);

// Ruta para actualizar un envío existente
router.put('/:id', entregaController.updateEntrega);

// Ruta para eliminar por IdInstitutoOK
router.delete('/by-idinstituto/:IdInstitutoOK', entregaController.deleteEntregaByIdInstitutoOK);

// Nueva ruta: Obtener info_ad por IdInstitutoOK
router.get("/info-ad/:idInstitutoOK", entregaController.getInfoAdByIdInstituto);

// Nueva ruta: Obtener todas las IDs de Institutos con su info_ad
router.get("/info-ad", entregaController.getAllInstitutesInfoAd);

// Nueva ruta: Obtener todos los productos
router.get("/productos", entregaController.getAllProducts);

// Nueva ruta: Obtener productos por IdInstitutoOK
router.get("/:IdInstitutoOK/productos", entregaController.getProductosByInstituto);


// Nueva ruta: Obtener todas las entregas completas por IdInstitutoOK
router.get("/:IdInstitutoOK", entregaController.getEntregasByInstituto);

// Nueva ruta: Obtener envíos con el IdInstitutoOK
router.get("/envios/instituto/:IdInstitutoOK", entregaController.getEnviosByInstitutoWithId);

// Nueva ruta: Obtener todos los envíos
router.get("/instituto/envios", entregaController.getAllEnvios);

// Nueva ruta: Obtener rastreos con el IdInstitutoOK
router.get("/rastreos/instituto/:IdInstitutoOK", entregaController.getRastreosByInstituto);

// Nueva ruta: Obtener todos los rastreos
router.get("/instituto/rastreos", entregaController.getAllRastreos);

router.get("/rastreos", entregaController.getAllRastreos);

router.post('/rastreos', entregaController.createRastreo);
//CRUD INFO 
router.put("/productos/:IdProdServOK", entregaController.updateProduct);

router.delete("/productos/:IdProdServOK", entregaController.deleteProduct);

// Nueva ruta: Obtener todas las IDs de Institutos con su info_ad
router.get("/info-ad", entregaController.getAllInstitutesInfoAd);

// Ruta para agregar información adicional
router.post("/info-adicional/:IdInstitutoOK", entregaController.addInfoAdicional);

// Nueva ruta para eliminar info_ad por IdInstitutoOK
router.delete( "/info-ad/:IdInstitutoOK", entregaController.deleteInfoAdByInstitute);

// Nueva ruta para actualizar Info Adicional
router.put('/info-ad/:IdInstitutoOK', entregaController.updateInfoAdByIdInstituto);

//CRUD ENVIOS

// Nueva ruta: Obtener todas las IDs de Institutos con sus envíos
router.get("/envios", entregaController.getAllInstitutesEnvios);

// Nueva ruta: Agregar un envío para un Instituto específico
router.post("/envios/:IdInstitutoOK", entregaController.addEnvio);

// Nueva ruta: Eliminar todos los envíos de un Instituto específico
router.delete("/envios/:IdInstitutoOK", entregaController.deleteEnviosByInstitute);

// Nueva ruta: Actualizar envíos de un Instituto específico
router.put("/envios/:IdInstitutoOK", entregaController.updateEnviosByInstitute);

router.put("/FIC/:IdInstitutoOK", entregaController.updateEntregaByIdInstitutoOK);
  


export default router;
