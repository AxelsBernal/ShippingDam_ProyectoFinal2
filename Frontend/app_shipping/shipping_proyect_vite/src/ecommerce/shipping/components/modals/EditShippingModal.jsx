import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const EditShippingModal = ({ open, onClose, envioData, onEdit }) => {
  const [formData, setFormData] = useState({
    IdInstitutoOK: "",
    IdNegocioOK: "",
    IdEntregaOK: "",
    IdEntregaBK: "",
    IdOrdenOK: "",
  });

  // Rellenar campos al recibir datos
  useEffect(() => {
    if (envioData) {
      setFormData(envioData); // Rellenar campos con los datos seleccionados
    }
  }, [envioData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onEdit(formData); // Pasar los datos editados al manejador
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Envío</DialogTitle>
      <DialogContent>
        <TextField
          label="ID Instituto"
          name="IdInstitutoOK"
          value={formData.IdInstitutoOK}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="ID Negocio"
          name="IdNegocioOK"
          value={formData.IdNegocioOK}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="ID Entrega"
          name="IdEntregaOK"
          value={formData.IdEntregaOK}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Entrega BK"
          name="IdEntregaBK"
          value={formData.IdEntregaBK}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Orden OK"
          name="IdOrdenOK"
          value={formData.IdOrdenOK}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditShippingModal;
