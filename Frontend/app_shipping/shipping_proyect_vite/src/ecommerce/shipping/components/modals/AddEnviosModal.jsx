import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { addEnvios } from "../../services/remote/post/AddEnvios";

const AddEnviosModal = ({ open, onClose, IdInstitutoOK, onEnvioAdded, enviosData }) => {
  const [formData, setFormData] = useState({
    IdDomicilioOK: "",
    IdPaqueteriaOK: "",
    IdTipoMetodoEnvio: "",
    CostoEnvio: "",
  });
  const [successMessage, setSuccessMessage] = useState(false); // Inicialización del estado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Verifica si ya existe un registro con el mismo ID Instituto
      const existeEnvio = enviosData.some(
        (envio) => envio.IdInstitutoOK === IdInstitutoOK
      );
  
  
      if (existeEnvio) {
        alert("Ya existe un envío asociado a este ID de Instituto.");
        return; // No continúes con la creación del registro
      }

      try {
        const envioData = { ...formData };
        await addEnvios(IdInstitutoOK, envioData); // Llamada al servicio
        setSuccessMessage(true); // Activar el mensaje de éxito
        onEnvioAdded({ IdInstitutoOK, ...envioData }); // Notificar al componente padre
        setFormData({
          IdDomicilioOK: "",
          IdPaqueteriaOK: "",
          IdTipoMetodoEnvio: "",
          CostoEnvio: "",
        }); // Limpiar el formulario
        onClose(); // Cerrar el modal
      } catch (error) {
        console.error("Error al agregar envío:", error);
        alert(error.message || "Ocurrió un error al agregar el envío.");
      }
    };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Agregar Nuevo Envío
          </Typography>
          <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="ID Instituto"
              value={IdInstitutoOK}
              fullWidth
              disabled
            />
            <TextField
              label="ID Domicilio"
              name="IdDomicilioOK"
              value={formData.IdDomicilioOK}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="ID Paquetería"
              name="IdPaqueteriaOK"
              value={formData.IdPaqueteriaOK}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Tipo Método Envío"
              name="IdTipoMetodoEnvio"
              value={formData.IdTipoMetodoEnvio}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Costo Envío"
              name="CostoEnvio"
              value={formData.CostoEnvio}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
            <Button variant="contained" onClick={handleSubmit}>
              Guardar
            </Button>
          </Stack>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(false)}
      >
        <Alert
          onClose={() => setSuccessMessage(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Envío agregado exitosamente!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddEnviosModal;
