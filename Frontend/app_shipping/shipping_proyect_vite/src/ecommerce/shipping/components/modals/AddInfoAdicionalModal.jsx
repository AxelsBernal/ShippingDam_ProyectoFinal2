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
import { addInfoAdicional } from "../../services/remote/post/AddInfoAdicional";

const AddInfoAdicional = ({ open, onClose, IdInstitutoOK, onInfoAdAdded }) => {
  const [formData, setFormData] = useState({
    Etiqueta: "",
    Valor: "",
    Secuencia: "",
    Activo: "S",
    FechaReg: new Date().toISOString().slice(0, 10), // Fecha actual
    UsuarioReg: "Sistema", // Usuario predeterminado
  });

  const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de éxito

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const infoAdicionalData = { ...formData };
      await addInfoAdicional(IdInstitutoOK, infoAdicionalData);
      
      // Mostrar mensaje de éxito
      setSuccessMessage(true);

      // Notifica al componente padre y cierra el modal
      onInfoAdAdded(infoAdicionalData);
      onClose();
    } catch (error) {
      console.error("Error al agregar información adicional:", error);
      alert(error.message || "Ocurrió un error al agregar información adicional.");
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
          <Typography variant="h6" component="h2" mb={2}>
            Agregar Información Adicional
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
                label="Etiqueta"
                name="Etiqueta"
                value={formData.Etiqueta}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Valor"
                name="Valor"
                value={formData.Valor}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Secuencia"
                name="Secuencia"
                value={formData.Secuencia}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
              <TextField
                label="Activo"
                name="Activo"
                value={formData.Activo}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Fecha Registro"
                name="FechaReg"
                value={formData.FechaReg}
                onChange={handleChange}
                type="date"
                fullWidth
              />
              <TextField
                label="Usuario Registro"
                name="UsuarioReg"
                value={formData.UsuarioReg}
                onChange={handleChange}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Guardar
              </Button>
            </Stack>
          </form>
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
          ¡Información adicional agregada correctamente!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddInfoAdicional;
