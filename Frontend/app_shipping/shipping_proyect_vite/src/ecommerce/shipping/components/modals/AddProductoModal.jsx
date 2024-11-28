import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const AddProductModal = ({ open, onClose, onAddProduct, IdInstitutoOK }) => {
  const [formData, setFormData] = useState({
    IdProdServOK: "",
    IdPresentaOK: "",
    DesProdServ: "",
    DesPresenta: "",
    CantidadPed: 0,
    CantidadEnt: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (!IdInstitutoOK) {
      alert("No hay un Instituto seleccionado.");
      return;
    }
    const productData = { ...formData, IdInstitutoOK };
    onAddProduct(productData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Producto</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="ID Producto"
            name="IdProdServOK"
            value={formData.IdProdServOK}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="ID Presentación"
            name="IdPresentaOK"
            value={formData.IdPresentaOK}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Descripción del Producto"
            name="DesProdServ"
            value={formData.DesProdServ}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Descripción de la Presentación"
            name="DesPresenta"
            value={formData.DesPresenta}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Cantidad Pedida"
            name="CantidadPed"
            type="number"
            value={formData.CantidadPed}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Cantidad Entregada"
            name="CantidadEnt"
            type="number"
            value={formData.CantidadEnt}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
