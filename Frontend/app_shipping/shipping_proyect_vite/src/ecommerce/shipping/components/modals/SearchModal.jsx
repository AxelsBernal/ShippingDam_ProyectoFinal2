import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const SearchModal = ({ open, onClose, onSearch }) => {
  const [instituteId, setInstituteId] = useState("");

  const handleSearch = () => {
    if (instituteId.trim()) {
      onSearch(instituteId.trim());
      onClose();
    } else {
      alert("Por favor, ingresa un ID de instituto válido.");
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
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400,
        }}
      >
        <Typography variant="h6" gutterBottom  color="Black"> 
          Buscar  por Instituto
        </Typography>
        <TextField
          label="ID del Instituto"
          fullWidth
          value={instituteId}
          onChange={(e) => setInstituteId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleSearch} variant="contained" color="primary">
            Buscar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SearchModal;
