import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

// Definimos las opciones de pestañas disponibles
const ShippingTabs = ["TABLA DE ENVÍOS", "INFO ADICIONAL", "PRODUCTOS", "ENVIOS", "RASTREO"];

const ShippingNavTab = ({ setCurrentNameTabInShippingTab }) => {
  // Estado para el índice de la pestaña seleccionada
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // Función que maneja el cambio de pestaña
  const handleTabChange = (event, newValue) => {
    setCurrentTabIndex(newValue); // Establece el nuevo índice de la pestaña
    setCurrentNameTabInShippingTab(ShippingTabs[newValue]); // Actualiza el nombre de la pestaña actual en el componente padre
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={currentTabIndex} // El valor de la pestaña seleccionada
        onChange={handleTabChange} // Controlador de cambio de pestaña
        aria-label="Shipping Tabs" // Descripción accesible
        variant="fullWidth" // Pestañas con el 100% del ancho
      >
        {ShippingTabs.map((tab, index) => (
          <Tab key={index} label={tab} /> // Genera las pestañas dinámicamente
        ))}
      </Tabs>
    </Box>
  );
};

export default ShippingNavTab;
