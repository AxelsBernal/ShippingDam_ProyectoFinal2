import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import PlaylistAddCheckIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteShippingModal from "../modals/DeleteShippingModal";
import SearchModal from "../modals/SearchModal";
import EditInfoAdModal from "../modals/EditInfoAdModal";

const InfoAdColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID del Instituto", size: 150 },
  { accessorKey: "Etiqueta", header: "Etiqueta", size: 200 },
  { accessorKey: "Valor", header: "Valor", size: 200 },
  { accessorKey: "Secuencia", header: "Secuencia", size: 50 },
  { accessorKey: "detail_row.Activo", header: "Activo", size: 50 },
  {
    accessorFn: (row) =>
      row.detail_row?.detail_row_reg?.[0]?.FechaReg || "Sin registro",
    header: "Fecha Registro",
    size: 200,
  },
  {
    accessorFn: (row) =>
      row.detail_row?.detail_row_reg?.[0]?.UsuarioReg || "Sin registro",
    header: "Usuario Registro",
    size: 150,
  },
];

const InfoAdTable = () => {
  const [infoAdData, setInfoAdData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Función para mostrar notificación con temporizador
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" }); // Limpia el mensaje después de 5 segundos
    }, 1500);
  };

  // Función para cargar toda la tabla de InfoAd
  const fetchAllInfoAd = async () => {
    try {
     // setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/info-ad`
      );

      if (response.data) {
        const processedData = response.data.flatMap((entry) =>
          entry.info_ad.map((infoAd) => ({
            ...infoAd,
            IdInstitutoOK: entry.IdInstitutoOK,
          }))
        );
        setInfoAdData(processedData);
      } else {
        setInfoAdData([]);
      }
    } catch (error) {
      console.error("Error al cargar todos los registros de InfoAd:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para buscar por instituto específico
  const handleSearchByInstitute = async (instituteId) => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/info-ad/${instituteId}`
      );

      if (response.data && response.data.info_ad) {
        const processedData = response.data.info_ad.map((infoAd) => ({
          ...infoAd,
          IdInstitutoOK: response.data.IdInstitutoOK,
        }));
        setInfoAdData(processedData);
      } else {
        setInfoAdData([]);
        showNotification(
          "No se encontraron resultados para el Instituto especificado.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error al buscar información por IdInstitutoOK:", error);
      showNotification(
        "Hubo un error al buscar información. Intenta nuevamente.",
        "error"
      );
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para eliminar Info Adicional
  const handleDeleteInfoAd = async () => {
    try {
      if (!selectedRow) {
        showNotification("Por favor, selecciona una fila para eliminar.", "error");
        return;
      }

      const { IdInstitutoOK } = selectedRow;

      await axios.delete(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/info-ad/${IdInstitutoOK}`
      );

      setInfoAdData((prevData) =>
        prevData.filter((row) => row.IdInstitutoOK !== IdInstitutoOK)
      );

      showNotification(
        `Información adicional del Instituto ${IdInstitutoOK} eliminada correctamente.`,
        "success"
      );
      setSelectedRow(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar Info Adicional:", error);
      showNotification(
        "Hubo un error al eliminar la información. Intenta nuevamente.",
        "error"
      );
    }
  };

  // Función para editar Info Adicional
  const handleEditInfoAd = async (updatedData) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/info-ad/${updatedData.IdInstitutoOK}`,
        updatedData
      );
      showNotification("Información adicional actualizada correctamente.", "success");
      fetchAllInfoAd(); // Recargar los datos
      setIsEditModalOpen(false); // Cerrar el modal
    } catch (error) {
      console.error("Error al actualizar información adicional:", error);
      showNotification(
        "Hubo un error al actualizar la información. Intenta nuevamente.",
        "error"
      );
    }
  };

  // Cargar todos los registros al montar el componente
  useEffect(() => {
    fetchAllInfoAd();
  }, []);

  return (
    <Box>
      {/* Mensaje de notificación */}
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

      {/* Modal de eliminación */}
      <DeleteShippingModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteShipping={handleDeleteInfoAd}
        selectedRow={selectedRow}
      />

      {/* Modal de búsqueda */}
      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearchByInstitute}
      />

      {/* Modal de edición */}
      <EditInfoAdModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditInfoAd={handleEditInfoAd}
        selectedRow={selectedRow}
      />

      {/* Tabla */}
      <MaterialReactTable
        columns={InfoAdColumns}
        data={infoAdData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => setSelectedRow(row.original),
          style: {
            backgroundColor:
              selectedRow?.IdInstitutoOK === row.original.IdInstitutoOK
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

            <Tooltip title="Eliminar registro seleccionado">
              <IconButton
                color="error"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={!selectedRow}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Editar registro seleccionado">
              <IconButton
                color="primary"
                onClick={() => setIsEditModalOpen(true)}
                disabled={!selectedRow}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Cargar todos los registros">
              <IconButton color="primary" onClick={fetchAllInfoAd}>
                <PlaylistAddCheckIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default InfoAdTable;
