import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { addProduct } from "../../services/remote/post/AddProductos";

const AddProductModal = ({ open, onClose, IdInstitutoOK, onProductAdded }) => {
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

  const handleSubmit = async () => {
    try {
      const productData = { ...formData, IdInstitutoOK };
      await addProduct(IdInstitutoOK, productData);
      alert("Producto agregado correctamente.");
      onProductAdded(productData); // Notifica al componente padre
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Ocurrió un error al agregar el producto.");
    }
  };
  

  return (
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
        <Typography variant="h6" component="h2" mb={2}>
          Agregar Producto
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="ID Instituto"
              value={IdInstitutoOK}
              disabled
              fullWidth
            />
            <TextField
              label="ID Producto"
              name="IdProdServOK"
              value={formData.IdProdServOK}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="ID Presentación"
              name="IdPresentaOK"
              value={formData.IdPresentaOK}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Descripción Producto"
              name="DesProdServ"
              value={formData.DesProdServ}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Descripción Presentación"
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Agregar
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
