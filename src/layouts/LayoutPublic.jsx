import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

const initialDataCart = JSON.parse(localStorage.getItem("dataProducts")) || [];

const LayoutPublic = () => {
  // El componente <LayoutPublic /> engloba a las rutas anidadas, actúa como estructura base
  // En <Outlet /> se renderiza el componente hijo correspondiente a la ruta y El <footer> es compartido por
  // todas las subrutas (Inicio, Contacto, Blog)

  const [cart, setCart] = useState(initialDataCart);

  useEffect(() => {
    localStorage.setItem("dataProducts", JSON.stringify(cart));
  }, [cart]);

  //Añade un unidades de un producto al carrito
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

  //Añade 1 unidad al producto
  const updateProduct = (product) => {
    setCart((previous) =>
      previous.map((item) =>
        item.id === product.id ? { ...item, units: item.units + 1 } : item
      )
    );
  };

  //Elimina 1 unidad del producto
  const deleteProduct = (product) => {
    setCart((previous) => {
      //Encuentra el produt seleccionado
      const actualProduct = previous.find((item) => item.id === product.id);
      //Si el produt seleccionado es mayor de 1, le quitamos 1 unidad

      if (actualProduct.units > 1) {
        return previous.map((item) =>
          item.id === product.id ? { ...item, units: item.units - 1 } : item
        );
      }
      //Si el produt seleccionado es 1, le eliminamos
      return previous.filter((item) => item.id !== product.id);
    });
  };

  //Elimina el producto del carrito
  const removeProduct = (product) =>
    setCart((previous) => previous.filter((item) => item.id !== product.id));

  console.log(cart);

  return (
    <>
      <Header
        cart={cart}
        onRemoveProduct={removeProduct}
        onAddProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />
      {/*Outlet context ->  cualquier página hija (Catalogo, Products) podrá usar la función*/}
      <Outlet context={{ addToCart, cart, deleteProduct, updateProduct }} />
      <h4>footer</h4>
    </>
  );
};

export default LayoutPublic;
