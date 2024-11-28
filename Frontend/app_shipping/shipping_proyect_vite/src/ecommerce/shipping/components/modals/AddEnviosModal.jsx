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
  FormHelperText
} from "@mui/material";
import { addEnvios } from "../../services/remote/post/AddEnvios";

const AddEnviosModal = ({ open, onClose, IdInstitutoOK, onEnvioAdded, enviosData }) => {
  const [formData, setFormData] = useState({
    IdDomicilioOK: "",
    IdPaqueteriaOK: "",
    IdTipoMetodoEnvio: "",
    CostoEnvio: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    IdDomicilioOK: "",
    IdPaqueteriaOK: "",
    IdTipoMetodoEnvio: "",
    CostoEnvio: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar el mensaje de error cuando el usuario comienza a escribir
    setErrorMessage((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación: Si el campo de IDInstitutoOK está vacío, marca todos los campos como requeridos
    const { IdDomicilioOK, IdPaqueteriaOK, IdTipoMetodoEnvio, CostoEnvio } = formData;
    let isValid = true;
    let newErrorMessage = { ...errorMessage };

    if (!IdInstitutoOK) {
      newErrorMessage.IdDomicilioOK = "El campo ID Instituto es obligatorio"; // Advertencia para IDInstitutoOK vacío
      isValid = false;
    }

    if (!IdDomicilioOK) {
      newErrorMessage.IdDomicilioOK = "Este campo es obligatorio";
      isValid = false;
    }
    if (!IdPaqueteriaOK) {
      newErrorMessage.IdPaqueteriaOK = "Este campo es obligatorio";
      isValid = false;
    }
    if (!IdTipoMetodoEnvio) {
      newErrorMessage.IdTipoMetodoEnvio = "Este campo es obligatorio";
      isValid = false;
    }
    if (!CostoEnvio) {
      newErrorMessage.CostoEnvio = "Este campo es obligatorio";
      isValid = false;
    }

    if (!isValid) {
      setErrorMessage(newErrorMessage); // Mostrar errores
      return; // Detener la ejecución si hay campos vacíos
    }

    // Verifica si ya existe un registro con el mismo ID Instituto
    const existeEnvio = enviosData.some(
      (envio) => envio.IdInstitutoOK === IdInstitutoOK
    );

    if (existeEnvio) {
      alert("Ya existe un envío asociado a este ID de Instituto.");
      return;
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
      setErrorMessage({}); // Limpiar mensajes de error
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
                error={!!errorMessage.IdDomicilioOK} // Aplica el estilo de error si hay un mensaje de error
              />
              {errorMessage.IdDomicilioOK && (
                <FormHelperText error>{errorMessage.IdDomicilioOK}</FormHelperText>
              )}

              <TextField
                label="ID Paquetería"
                name="IdPaqueteriaOK"
                value={formData.IdPaqueteriaOK}
                onChange={handleChange}
                fullWidth
                required
                error={!!errorMessage.IdPaqueteriaOK} // Aplica el estilo de error si hay un mensaje de error
              />
              {errorMessage.IdPaqueteriaOK && (
                <FormHelperText error>{errorMessage.IdPaqueteriaOK}</FormHelperText>
              )}

              <TextField
                label="Tipo Método Envío"
                name="IdTipoMetodoEnvio"
                value={formData.IdTipoMetodoEnvio}
                onChange={handleChange}
                fullWidth
                required
                error={!!errorMessage.IdTipoMetodoEnvio} // Aplica el estilo de error si hay un mensaje de error
              />
              {errorMessage.IdTipoMetodoEnvio && (
                <FormHelperText error>{errorMessage.IdTipoMetodoEnvio}</FormHelperText>
              )}

              <TextField
                label="Costo Envío"
                name="CostoEnvio"
                value={formData.CostoEnvio}
                onChange={handleChange}
                fullWidth
                required
                type="number"
                error={!!errorMessage.CostoEnvio} // Aplica el estilo de error si hay un mensaje de error
              />
              {errorMessage.CostoEnvio && (
                <FormHelperText error>{errorMessage.CostoEnvio}</FormHelperText>
              )}

              <Button variant="contained" type="submit">
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
