import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, Button, Stack, TextField } from "@mui/material";

const EditEnviosModal = ({ open, onClose, onEditEnvio, selectedRow }) => {
  const [formData, setFormData] = useState({
    IdInstitutoOK: "",
    IdDomicilioOK: "",
    IdPaqueteriaOK: "",
    IdTipoMetodoEnvio: "",
    CostoEnvio: "",
  });

  // Cargar datos de la fila seleccionada al abrir el modal
  useEffect(() => {
    if (selectedRow) {
      setFormData({
        IdInstitutoOK: selectedRow.IdInstitutoOK || "",
        IdDomicilioOK: selectedRow.IdDomicilioOK || "",
        IdPaqueteriaOK: selectedRow.IdPaqueteriaOK || "",
        IdTipoMetodoEnvio: selectedRow.IdTipoMetodoEnvio || "",
        CostoEnvio: selectedRow.CostoEnvio || "",
      });
    }
  }, [selectedRow]);

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = () => {
    if (!formData.IdDomicilioOK || !formData.IdPaqueteriaOK || !formData.CostoEnvio) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    onEditEnvio(formData); // Llama a la función de edición
    onClose(); // Cierra el modal
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
          Editar Envío
        </Typography>

        <Stack spacing={2}>
          {/* ID Instituto (deshabilitado) */}
          <TextField
            label="ID del Instituto"
            name="IdInstitutoOK"
            value={formData.IdInstitutoOK}
            disabled
          />

          {/* ID Domicilio */}
          <TextField
            label="ID Domicilio"
            name="IdDomicilioOK"
            value={formData.IdDomicilioOK}
            onChange={handleChange}
            required
          />

          {/* ID Paquetería */}
          <TextField
            label="ID Paquetería"
            name="IdPaqueteriaOK"
            value={formData.IdPaqueteriaOK}
            onChange={handleChange}
            required
          />

          {/* Tipo Método Envío */}
          <TextField
            label="Tipo Método Envío"
            name="IdTipoMetodoEnvio"
            value={formData.IdTipoMetodoEnvio}
            onChange={handleChange}
            required
          />

          {/* Costo Envío */}
          <TextField
            label="Costo Envío"
            name="CostoEnvio"
            type="number"
            value={formData.CostoEnvio}
            onChange={handleChange}
            required
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

export default EditEnviosModal;
