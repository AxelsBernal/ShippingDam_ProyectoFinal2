import React from "react";
import { Box, Modal, Typography, Button, Stack } from "@mui/material";

const DeleteShippingModal = ({ open, onClose, onDeleteShipping, selectedRow }) => {
  const handleDelete = () => {
    if (!selectedRow) {
      alert("Por favor, selecciona un envío para eliminar.");
      return;
    }
    onDeleteShipping(); // Llama a la función de eliminación directamente
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
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Título en rojo */}
        <Typography
          variant="h6"
          mb={2}
          sx={{
            color: "red", // Cambiar color del título a rojo
          }}
        >
          Eliminar 
        </Typography>

        {/* Pregunta con letras negras */}
        <Typography
          variant="body1"
          mb={2}
          sx={{
            color: "black", // Cambiar color del texto a negro
          }}
        >
          ¿Estás seguro de que deseas eliminar  ID: <strong>{selectedRow?.IdInstitutoOK}</strong>?
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!selectedRow}
          >
            Eliminar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteShippingModal;
