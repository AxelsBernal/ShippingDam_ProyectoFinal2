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
import axios from "axios";

const AddShippingModal = ({ open, onClose, onAddShipping }) => {
  const [formData, setFormData] = useState({
    IdInstitutoOK: "",
    IdNegocioOK: "",
    IdEntregaOK: "",
    IdEntregaBK: "",
    IdOrdenOK: "",
  });

  const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de éxito

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Llamada al backend para guardar los datos
      const response = await axios.post(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas`,
        formData
      );

      // Si la solicitud es exitosa, actualiza el estado en el frontend
      onAddShipping(response.data);

      // Muestra el mensaje de éxito
      setSuccessMessage(true);

      // Limpia el formulario y cierra el modal
      setFormData({
        IdInstitutoOK: "",
        IdNegocioOK: "",
        IdEntregaOK: "",
        IdEntregaBK: "",
        IdOrdenOK: "",
      });
      onClose();
    } catch (error) {
      console.error("Error al agregar envío:", error);
      alert("Hubo un error al guardar el envío. Intenta nuevamente.");
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
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Agregar Nuevo Envío
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Instituto OK"
              name="IdInstitutoOK"
              value={formData.IdInstitutoOK}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Negocio OK"
              name="IdNegocioOK"
              value={formData.IdNegocioOK}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="ID Entrega OK"
              name="IdEntregaOK"
              value={formData.IdEntregaOK}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="ID Entrega BK"
              name="IdEntregaBK"
              value={formData.IdEntregaBK}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="ID Orden OK"
              name="IdOrdenOK"
              value={formData.IdOrdenOK}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" onClick={handleSubmit}>
              Guardar
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Snackbar para el mensaje de éxito */}
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

export default AddShippingModal;
