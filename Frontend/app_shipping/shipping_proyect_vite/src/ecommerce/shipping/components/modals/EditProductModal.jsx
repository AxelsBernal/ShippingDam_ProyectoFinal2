import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const EditProductModal = ({ open, onClose, onEditProduct, selectedRow }) => {
  const [formData, setFormData] = useState({});

  // Actualizar formData cuando selectedRow cambie
  useEffect(() => {
    if (selectedRow) {
      setFormData(selectedRow);
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onEditProduct(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
        <TextField
          name="DesProdServ"
          label="Descripción del Producto"
          value={formData.DesProdServ || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="CantidadPed"
          label="Cantidad Pedida"
          type="number"
          value={formData.CantidadPed || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="CantidadEnt"
          label="Cantidad Entregada"
          type="number"
          value={formData.CantidadEnt || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
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

export default EditProductModal;
