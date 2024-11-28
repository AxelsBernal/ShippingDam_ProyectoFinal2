import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack } from "@mui/material";
import axios from "axios";
import PlaylistAddCheckIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteShippingModal from "../modals/DeleteShippingModal";
import EditProductModal from "../modals/EditProductModal";

const ProductColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID Instituto", size: 200 },
  { accessorKey: "IdProdServOK", header: "ID Producto", size: 150 },
  { accessorKey: "DesProdServ", header: "Descripción del Producto", size: 200 },
  { accessorKey: "CantidadPed", header: "Cantidad Pedida", size: 100 },
  { accessorKey: "CantidadEnt", header: "Cantidad Entregada", size: 100 },
];

const ProductTable = () => {
  const [productData, setProductData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Función para obtener todos los productos
  const fetchAllProducts = async () => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/productos`
      );

      if (response.data) {
        const processedData = response.data.flatMap((entry) =>
          entry.productos.map((product) => ({
            ...product,
            IdInstitutoOK: entry.IdInstitutoOK,
          }))
        );
        setProductData(processedData);
      } else {
        setProductData([]);
      }
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para eliminar un producto
  const handleDeleteProduct = async () => {
    try {
      if (!selectedRow) {
        alert("Por favor, selecciona un producto para eliminar.");
        return;
      }

      const { IdProdServOK } = selectedRow;

      await axios.delete(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/productos/${IdProdServOK}`
      );

      setProductData((prevData) =>
        prevData.filter((row) => row.IdProdServOK !== IdProdServOK)
      );

      alert(`Producto ${IdProdServOK} eliminado correctamente.`);
      setSelectedRow(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al eliminar el producto. Intenta nuevamente.");
    }
  };

  // Función para editar un producto
  const handleEditProduct = async (updatedProduct) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/productos/${updatedProduct.IdProdServOK}`,
        updatedProduct
      );

      setProductData((prevData) =>
        prevData.map((product) =>
          product.IdProdServOK === updatedProduct.IdProdServOK
            ? updatedProduct
            : product
        )
      );

      alert("Producto actualizado correctamente.");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un error al actualizar el producto. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Box>
      {/* Modal de eliminación */}
      <DeleteShippingModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteShipping={handleDeleteProduct}
        selectedRow={selectedRow}
      />

      {/* Modal de edición */}
      <EditProductModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditProduct={handleEditProduct}
        selectedRow={selectedRow}
      />

      {/* Tabla */}
      <MaterialReactTable
        columns={ProductColumns}
        data={productData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => setSelectedRow(row.original),
          style: {
            backgroundColor:
              selectedRow?.IdProdServOK === row.original.IdProdServOK
                ? "#d1e7ff"
                : "white",
            cursor: "pointer",
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Eliminar Producto Seleccionado">
              <IconButton
                color="error"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={!selectedRow}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar Producto Seleccionado">
              <IconButton
                color="primary"
                onClick={() => setIsEditModalOpen(true)}
                disabled={!selectedRow}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cargar Productos">
              <IconButton color="primary" onClick={fetchAllProducts}>
                <PlaylistAddCheckIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default ProductTable;
