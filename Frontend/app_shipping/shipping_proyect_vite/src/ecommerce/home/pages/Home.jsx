import { Outlet } from "react-router-dom";
import AppBar from "../../../share/bars/components/CommerceAppBar";
import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material"; // Importando Material UI para tarjetas
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"; // Para gráfico circular
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer as BarResponsiveContainer } from "recharts"; // Para gráfico de barras

// Ejemplo de productos
const products = [
  {
    id: 1,
    name: "Smartphone",
    price: "$799.99",
    weight: "0.4 kg",
    img: "https://via.placeholder.com/150", // Imagen de ejemplo
  },
  {
    id: 2,
    name: "Laptop",
    price: "$1199.99",
    weight: "1.5 kg",
    img: "https://via.placeholder.com/150", // Imagen de ejemplo
  },
  {
    id: 3,
    name: "Headphones",
    price: "$99.99",
    weight: "0.3 kg",
    img: "https://via.placeholder.com/150", // Imagen de ejemplo
  },
];

// Ejemplo de estadísticas para gráficos
const dataPieChart = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home Appliances", value: 300 },
];

const dataBarChart = [
  { name: "January", uv: 4000, pv: 2400 },
  { name: "February", uv: 3000, pv: 1398 },
  { name: "March", uv: 2000, pv: 9800 },
  { name: "April", uv: 2780, pv: 3908 },
];

export default function Home() {
  return (
    <div id="div-home">
      <div id="div-appbar">
        <AppBar />
      </div>

      <div id="detail">
        <Outlet />
      </div>

      {/* Sección de productos */}
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Productos Recomendados
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.img}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Peso: {product.weight}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      
    </div>
  );
}
