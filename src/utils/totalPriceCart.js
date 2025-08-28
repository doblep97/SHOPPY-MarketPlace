// Función que devuelve segun el precio y cantidad el total del carrito

const totalPrice = (products) => {
  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price * product.units;
  }, 0);

  return totalPrice;
};

export default totalPrice;
