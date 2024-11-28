import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack, Typography } from "@mui/material";
import PlaylistAddCheckIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import SearchModal from "../modals/SearchModal";
import EditTrackingModal from "../modals/EditTrackingModal";
import DeleteShippingModal from "../modals/DeleteShippingModal";

const TrackingColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID del Instituto", size: 150 },
  { accessorKey: "NumeroGuia", header: "Número de Guía", size: 200 },
  { accessorKey: "IdRepartidorOK", header: "ID Repartidor", size: 200 },
  { accessorKey: "NombreRepartidor", header: "Nombre Repartidor", size: 200 },
  { accessorKey: "Alias", header: "Alias", size: 200 },
];

const TrackingTable = () => {
  const [trackingData, setTrackingData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Función para mostrar notificación con temporizador
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" }); // Limpia el mensaje después de 5 segundos
    }, 1500);
  };

  // Función para cargar todos los rastreos
  const fetchAllTrackings = async () => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/instituto/rastreos`
      );
      if (response.data) {
        setTrackingData(response.data);
      } else {
        setTrackingData([]);
      }
    } catch (error) {
      console.error("Error al cargar los rastreos:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para buscar rastreos por Instituto
  const handleSearchByInstitute = async (instituteId) => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/rastreos/instituto/${instituteId}`
      );
      if (response.data) {
        setTrackingData(response.data);
      } else {
        setTrackingData([]);
        showNotification(
          "No se encontraron rastreos para el Instituto especificado.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error al buscar rastreos por Instituto:", error);
      showNotification(
        "Hubo un error al buscar rastreos. Intenta nuevamente.",
        "error"
      );
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para editar un rastreo
  const handleEditTracking = async (formData) => {
    try {
      const { IdInstitutoOK, NumeroGuia } = formData;
  
      const response = await axios.put(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/rastreos/${IdInstitutoOK}/${NumeroGuia}`,
        formData
      );
  
      console.log("Respuesta del servidor:", response.data);
  
      // Actualizar la tabla con los nuevos datos
      setTrackingData((prevData) =>
        prevData.map((row) =>
          row.NumeroGuia === NumeroGuia && row.IdInstitutoOK === IdInstitutoOK
            ? { ...row, ...formData }
            : row
        )
      );
  
      alert("Rastreo actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el rastreo:", error.response || error.message);
      alert("Hubo un problema al actualizar el rastreo. Intenta nuevamente.");
    }
  };
  
  
  

  // Función para eliminar un rastreo
  const handleDeleteTracking = async () => {
    try {
      if (!selectedRow) {
        showNotification("Por favor, selecciona un rastreo para eliminar.", "error");
        return;
      }

      const { IdInstitutoOK, NumeroGuia } = selectedRow;

      await axios.delete(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/rastreos/${IdInstitutoOK}/${NumeroGuia}`
      );
      

      setTrackingData((prevData) =>
        prevData.filter(
          (row) =>
            row.IdInstitutoOK !== IdInstitutoOK || row.NumeroGuia !== NumeroGuia
        )
      );

      showNotification("Rastreo eliminado correctamente.", "success");
      setSelectedRow(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar rastreo:", error);
      showNotification(
        "Hubo un error al eliminar el rastreo. Intenta nuevamente.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchAllTrackings();
  }, []);

  return (
    <Box>
      {/* Notificación */}
      {notification.message && (
        <Typography
          sx={{
            mb: 2,
            p: 1,
            borderRadius: 1,
            textAlign: "center",
            backgroundColor:
              notification.type === "success" ? "#d4edda" : "#f8d7da",
            color: notification.type === "success" ? "#155724" : "#721c24",
          }}
        >
          {notification.message}
        </Typography>
      )}

      {/* Modales */}
      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearchByInstitute}
      />
      <EditTrackingModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditTracking={handleEditTracking}
        selectedRow={selectedRow}
      />
      <DeleteShippingModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteTracking} // Cambiado para coincidir con la prop esperada
        selectedRow={selectedRow}
        entity="rastreo" // Especifica que es un rastreo
      />

      {/* Tabla */}
      <MaterialReactTable
        columns={TrackingColumns}
        data={trackingData}
        state={{ isLoading: loadingTable }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => setSelectedRow(row.original),
          style: {
            backgroundColor:
              selectedRow?.IdInstitutoOK === row.original.IdInstitutoOK &&
              selectedRow?.NumeroGuia === row.original.NumeroGuia
                ? "#d1e7ff"
                : "white",
            cursor: "pointer",
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Buscar por Instituto">
              <IconButton
                color="info"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar rastreo seleccionado">
              <IconButton
                color="primary"
                onClick={() => setIsEditModalOpen(true)}
                disabled={!selectedRow}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar rastreo seleccionado">
              <IconButton
                color="error"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={!selectedRow}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Recargar datos">
              <IconButton color="primary" onClick={fetchAllTrackings}>
                <PlaylistAddCheckIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default TrackingTable;