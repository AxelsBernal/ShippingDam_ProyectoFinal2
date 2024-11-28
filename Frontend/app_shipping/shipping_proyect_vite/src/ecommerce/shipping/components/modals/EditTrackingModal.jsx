import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, Button, Stack, TextField } from "@mui/material";

const EditTrackingModal = ({ open, onClose, onEditTracking, selectedRow }) => {
  const [formData, setFormData] = useState({
    IdInstitutoOK: "",
    NumeroGuia: "",
    IdRepartidorOK: "",
    NombreRepartidor: "",
    Alias: "",
  });

  const [errors, setErrors] = useState({});

  // Inicializa el formulario con los datos de la fila seleccionada
  useEffect(() => {
    if (selectedRow) {
      setFormData({
        IdInstitutoOK: selectedRow.IdInstitutoOK || "",
        NumeroGuia: selectedRow.NumeroGuia || "",
        IdRepartidorOK: selectedRow.IdRepartidorOK || "",
        NombreRepartidor: selectedRow.NombreRepartidor || "",
        Alias: selectedRow.Alias || "",
      });
      setErrors({});
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.NumeroGuia) newErrors.NumeroGuia = "El número de guía es obligatorio.";
    if (!formData.IdRepartidorOK) newErrors.IdRepartidorOK = "El ID de repartidor es obligatorio.";
    if (!formData.NombreRepartidor) newErrors.NombreRepartidor = "El nombre del repartidor es obligatorio.";
    if (!formData.Alias) newErrors.Alias = "El alias es obligatorio.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onEditTracking(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2} color="primary">
          Editar Rastreo
        </Typography>

        <Stack spacing={2}>
          {/* Número de Guía */}
          <TextField
            label="Número de Guía"
            name="NumeroGuia"
            value={formData.NumeroGuia}
            onChange={handleChange}
            error={!!errors.NumeroGuia}
            helperText={errors.NumeroGuia}
          />

          {/* ID Repartidor */}
          <TextField
            label="ID Repartidor"
            name="IdRepartidorOK"
            value={formData.IdRepartidorOK}
            onChange={handleChange}
            error={!!errors.IdRepartidorOK}
            helperText={errors.IdRepartidorOK}
          />

          {/* Nombre Repartidor */}
          <TextField
            label="Nombre Repartidor"
            name="NombreRepartidor"
            value={formData.NombreRepartidor}
            onChange={handleChange}
            error={!!errors.NombreRepartidor}
            helperText={errors.NombreRepartidor}
          />

          {/* Alias */}
          <TextField
            label="Alias"
            name="Alias"
            value={formData.Alias}
            onChange={handleChange}
            error={!!errors.Alias}
            helperText={errors.Alias}
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar Cambios
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditTrackingModal;
