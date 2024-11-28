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
  const [errors, setErrors] = useState({}); // Estado para guardar los errores de validación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let formIsValid = true;

    // Validación para asegurarse de que todos los campos sean llenados
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "Este campo es obligatorio";
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Si la validación falla, no envíes el formulario
    }

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
            {["IdInstitutoOK", "IdNegocioOK", "IdEntregaOK", "IdEntregaBK", "IdOrdenOK"].map((field) => (
              <TextField
                key={field}
                label={field.replace("Id", "").replace(/([A-Z])/g, " $1")}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                fullWidth
                error={!!errors[field]} // Si hay error, muestra el borde rojo
                helperText={errors[field]} // Muestra el mensaje de error
              />
            ))}
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
