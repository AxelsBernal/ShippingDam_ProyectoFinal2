import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import DeleteShippingModal from "../modals/DeleteShippingModal"; // Modal para eliminar envíos
import EditEnviosModal from "../modals/EditEnviosModal"; // Modal para editar envíos
import SearchModal from "../modals/SearchModal";

const EnviosColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID del Instituto", size: 150 },
  { accessorKey: "IdDomicilioOK", header: "ID Domicilio OK", size: 200 },
  { accessorKey: "IdPaqueteriaOK", header: "ID Paquetería OK", size: 200 },
  { accessorKey: "IdTipoMetodoEnvio", header: "Tipo Método Envío", size: 200 },
  { accessorKey: "CostoEnvio", header: "Costo Envío", size: 100 },
];

const EnviosTable = () => {
  const [enviosData, setEnviosData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Función para obtener todos los envíos
  const fetchAllEnvios = async () => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/instituto/envios`
      );
      setEnviosData(
        response.data.flatMap((institute) =>
          institute.envios.map((envio) => ({
            IdInstitutoOK: institute.IdInstitutoOK,
            ...envio,
          }))
        )
      );
    } catch (error) {
      console.error("Error al obtener todos los envíos:", error);
      alert("Hubo un problema al cargar los envíos. Intente nuevamente.");
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para buscar envíos por IdInstitutoOK
  const handleSearchByInstitute = async (instituteId) => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/envios/instituto/${instituteId}`
      );
      if (response.data && response.data.envios) {
        setEnviosData(
          response.data.envios.map((envio) => ({
            IdInstitutoOK: response.data.IdInstitutoOK,
            ...envio,
          }))
        );
      } else {
        setEnviosData([]);
        alert("No se encontraron envíos para el Instituto especificado.");
      }
    } catch (error) {
      console.error("Error al buscar envíos por IdInstitutoOK:", error);
      alert("Hubo un problema al buscar los envíos. Intente nuevamente.");
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para eliminar un envío
  const handleDeleteEnvio = async () => {
    try {
      if (!selectedRow) {
        alert("Por favor, selecciona un envío para eliminar.");
        return;
      }

      const { IdInstitutoOK, IdDomicilioOK } = selectedRow;

      await axios.delete(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/envios/${IdInstitutoOK}`
      );
      

      setEnviosData((prevData) =>
        prevData.filter(
          (row) =>
            row.IdInstitutoOK !== IdInstitutoOK ||
            row.IdDomicilioOK !== IdDomicilioOK
        )
      );

      alert("Envío eliminado correctamente.");
      setSelectedRow(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar envío:", error);
      alert("Hubo un problema al eliminar el envío. Intente nuevamente.");
    }
  };

  // Función para editar un envío
  const handleEditEnvio = async (updatedData) => {
    try {
      const { IdInstitutoOK } = updatedData;
  
      await axios.put(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/envios/${IdInstitutoOK}`,
        updatedData
      );
  
      setEnviosData((prevData) =>
        prevData.map((row) =>
          row.IdInstitutoOK === updatedData.IdInstitutoOK ? updatedData : row
        )
      );
  
      alert("Envío actualizado correctamente.");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error al editar envío:", error);
      alert("Hubo un problema al editar el envío. Intente nuevamente.");
    }
  };
  

  // Cargar todos los envíos al montar el componente
  useEffect(() => {
    fetchAllEnvios();
  }, []);

  return (
    <Box>
      {/* Modal para eliminar envíos */}
      <DeleteShippingModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteShipping={handleDeleteEnvio}
        selectedRow={selectedRow}
      />

      {/* Modal para editar envíos */}
      <EditEnviosModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditEnvio={handleEditEnvio} // Asegúrate de que este nombre coincide
        selectedRow={selectedRow}
      />

      {/* Modal de búsqueda */}
      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearchByInstitute}
      />

      {/* Tabla de MaterialReactTable */}
      <MaterialReactTable
        columns={EnviosColumns}
        data={enviosData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => setSelectedRow(row.original),
          style: {
            backgroundColor:
              selectedRow?.IdDomicilioOK === row.original.IdDomicilioOK &&
              selectedRow?.IdInstitutoOK === row.original.IdInstitutoOK
                ? "#d1e7ff"
                : "white",
            cursor: "pointer",
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Cargar todos los envíos">
              <IconButton color="primary" onClick={fetchAllEnvios}>
                <ListAltIcon />
              </IconButton>
           
            </Tooltip>
            <Tooltip title="Buscar por Instituto">
              <IconButton
                color="info"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar Envío">
              <IconButton
                color="error"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={!selectedRow}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar Envío">
              <IconButton
                color="primary"
                onClick={() => setIsEditModalOpen(true)}
                disabled={!selectedRow}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default EnviosTable;

