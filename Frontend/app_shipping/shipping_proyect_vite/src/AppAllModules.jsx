import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import SecurityRouter from "./navigation/NaviRoutesSecurity";
import Footer from "./share/footer/components/Footer";

// Redux imports
import { useDispatch } from "react-redux";
import { fetchShippingData } from "./redux/thunks";

// Ruta del logo de Amazon
import amazonLogo from "./assets/amazonblanco.png"; // Asegúrate de ajustar esta ruta

export default function AppAllModules() {
  const dispatch = useDispatch();

  // Cargar los datos al montar el componente
  useEffect(() => {
    dispatch(fetchShippingData());
  }, [dispatch]);

  return (
    <>
      <div
        id="div-app"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#121212",
        }}
      >
        {/* Logo de Amazon */}
        <img
          src={amazonLogo}
          alt="Logo de Amazon"
          style={{
            height: "100px",
            marginBottom: "2rem",
          }}
        />

        {/* Rutas principales controladas por el enrutador */}
        <RouterProvider router={SecurityRouter} />

        {/* Footer fijo */}
        <div id="div-footer" style={{ width: "100%" }}>
          <Footer />
        </div>
      </div>
    </>
  );
}
