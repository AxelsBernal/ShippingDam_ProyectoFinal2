import { Box } from "@mui/material";
import { useState } from "react";
import ShippingNavTab from "../tabs/ShippingNavTab"; // Importación del componente para la navegación de las pestañas
import InfoAdTab from "../tables/InfoAdTable"; // Importación de la tabla para "INFO ADICIONAL"
import ProductTable from "../tables/ProductTable"; // Importación de la tabla para "PRODUCTOS"
import ShippingsTable from "../tables/ShippingsTable"; // Importación de la tabla para "TABLA DE ENVÍOS"
import EnviosTable from "../tables/EnviosTable"; // Importación de la tabla para "ENVIOS"
import RastreoTable from "../tables/RastreoTable"; // Importación de la tabla para "RASTREO"

export default function ShippingTab() {
  // Estado para el nombre de la pestaña seleccionada
  const [currentNameTabInShippingTab, setCurrentNameTabInShippingTab] = useState("TABLA DE ENVÍOS");
  // Estado para forzar la recarga de la tabla de envíos cuando sea necesario
  const [reloadShippings, setReloadShippings] = useState(false);

  // Función que maneja el cambio de pestaña
  const handleTabChange = (tabName) => {
    setCurrentNameTabInShippingTab(tabName);
    // Forzar la recarga de la "TABLA DE ENVÍOS" cuando se cambia a esta pestaña
    if (tabName === "TABLA DE ENVÍOS") {
      setReloadShippings((prev) => !prev); // Invertir el valor de reloadShippings
    }
  };

  return (
    <Box>
      {/* Navegación de las pestañas, pasando la función de cambio de pestaña como prop */}
      <ShippingNavTab setCurrentNameTabInShippingTab={handleTabChange} />

      {/* Renderizado condicional del contenido según la pestaña seleccionada */}
      {currentNameTabInShippingTab === "TABLA DE ENVÍOS" && <ShippingsTable key={reloadShippings} />}
      {currentNameTabInShippingTab === "INFO ADICIONAL" && <InfoAdTab />}
      {currentNameTabInShippingTab === "PRODUCTOS" && <ProductTable />}
      {currentNameTabInShippingTab === "ENVIOS" && <EnviosTable />}
      {currentNameTabInShippingTab === "RASTREO" && <RastreoTable />}
    </Box>
  );
}
