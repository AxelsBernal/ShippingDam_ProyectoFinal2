import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, Button, Stack, TextField, MenuItem } from "@mui/material";

const EditInfoAdModal = ({ open, onClose, onEditInfoAd, selectedRow }) => {
  const [formData, setFormData] = useState({
    IdInstitutoOK: "",
    Etiqueta: "",
    Valor: "",
    Secuencia: "",
    Activo: "S",
    FechaReg: "",
    UsuarioReg: "",
  });

  const [errors, setErrors] = useState({}); // Estado para manejar errores

  // Inicializa el formulario con los datos de la fila seleccionada
  useEffect(() => {
    if (selectedRow) {
      setFormData({
        IdInstitutoOK: selectedRow.IdInstitutoOK || "",
        Etiqueta: selectedRow.Etiqueta || "",
        Valor: selectedRow.Valor || "",
        Secuencia: selectedRow.Secuencia || "",
        Activo: selectedRow.detail_row?.Activo || "S",
        FechaReg: selectedRow.detail_row?.detail_row_reg?.[0]?.FechaReg || "",
        UsuarioReg: selectedRow.detail_row?.detail_row_reg?.[0]?.UsuarioReg || "",
      });
      setErrors({}); // Limpia los errores al abrir el modal
    }
  }, [selectedRow]);

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Valor" && !/^\d*$/.test(value)) {
      // Filtrar solo números para el campo "Valor"
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Limpia el error cuando se cambia el valor
    }));
  };

  // Valida los campos del formulario
  const validateForm = () => {
    const newErrors = {};
    if (!formData.Etiqueta) newErrors.Etiqueta = "La etiqueta es obligatoria.";
    if (!formData.Valor) newErrors.Valor = "El valor es obligatorio.";
    if (!formData.Secuencia) newErrors.Secuencia = "La secuencia es obligatoria.";
    if (!formData.UsuarioReg) newErrors.UsuarioReg = "El usuario registrado es obligatorio.";
    return newErrors;
  };

  // Maneja el envío del formulario
  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onEditInfoAd(formData); // Llama a la función para actualizar la información
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
          Editar Información Adicional
        </Typography>

        <Stack spacing={2}>
          {/* ID Instituto (Deshabilitado) */}
          <TextField
            label="ID del Instituto"
            name="IdInstitutoOK"
            value={formData.IdInstitutoOK}
            disabled
          />

          {/* Etiqueta */}
          <TextField
            label="Etiqueta"
            name="Etiqueta"
            value={formData.Etiqueta}
            onChange={handleChange}
            error={!!errors.Etiqueta}
            helperText={errors.Etiqueta}
          />

          {/* Valor */}
          <TextField
            label="Valor"
            name="Valor"
            value={formData.Valor}
            onChange={handleChange}
            error={!!errors.Valor}
            helperText={errors.Valor}
          />

          {/* Secuencia */}
          <TextField
            label="Secuencia"
            name="Secuencia"
            type="number"
            value={formData.Secuencia}
            onChange={handleChange}
            error={!!errors.Secuencia}
            helperText={errors.Secuencia}
          />

          {/* Activo */}
          <TextField
            label="Activo"
            name="Activo"
            select
            value={formData.Activo}
            onChange={handleChange}
          >
            <MenuItem value="S">Sí</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </TextField>

          {/* Fecha Registro */}
          <TextField
            label="Fecha de Registro"
            name="FechaReg"
            type="datetime-local"
            value={formData.FechaReg}
            onChange={handleChange}
          />

          {/* Usuario Registro */}
          <TextField
            label="Usuario Registro"
            name="UsuarioReg"
            value={formData.UsuarioReg}
            onChange={handleChange}
            error={!!errors.UsuarioReg}
            helperText={errors.UsuarioReg}
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

export default EditInfoAdModal;
