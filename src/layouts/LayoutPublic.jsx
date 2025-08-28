import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

const LayoutPublic = () => {
  // El componente <LayoutPublic /> engloba a las rutas anidadas, actúa como estructura base
  // En <Outlet /> se renderiza el componente hijo correspondiente a la ruta y El <footer> es compartido por
  // todas las subrutas (Inicio, Contacto, Blog)

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((previous) => {
      //Buscamos si el producto que compramos ya está en el carrito ('.find' devuelve el primer item que cumple su condición)
      const productFound = previous.find((item) => item.id === product.id);
      //Si lo encontramos, mapemaos todos los items y aquel que coincida, le sumamos 1 a la cantidad
      if (productFound) {
        return previous.map((item) =>
          item.id === product.id ? { ...item, units: item.units + 1 } : item
        );
      }
      //Sino lo encuentra, le añadimos 1 unidad a ese producto
      return [...previous, { ...product, units: 1 }];
    });
  };

  console.log(cart);

  return (
    <>
      <Header cart={cart} />
      {/*Outlet context ->  cualquier página hija (Catalogo, Products) podrá usar la función*/}
      <Outlet context={{ addToCart }} />
      <h4>footer</h4>
    </>
  );
};

export default LayoutPublic;
