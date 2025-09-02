import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LayoutPublic from "./layouts/LayoutPublic";
import Catalogo from "./pages/Catalogo";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPublic />}>
          <Route index element={<Catalogo />}></Route>
          <Route path="/product/:id" element={<Products />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
