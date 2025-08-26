import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LayoutPublic from "./layouts/LayoutPublic";
import Catalogo from "./pages/Catalogo";
import Products from "./pages/Products";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPublic />}>
          <Route index element={<Catalogo />}></Route>
          <Route path="/product/:id" element={<Products />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
