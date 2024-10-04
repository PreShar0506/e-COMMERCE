// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        {/* <Header /> */}
        <main style={{ padding: "20px" }}>
          <AppRoutes />
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
