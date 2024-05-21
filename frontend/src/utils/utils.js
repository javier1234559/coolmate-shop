export const calcProvisional = (listItemCart) => {
  const provisionalTotal = listItemCart.reduce((accumulator, current) => {
    return accumulator + current.product.price * current.quantity;
  }, 0);
  return (Math.round(provisionalTotal * 100) / 100);
}

export const calculateTotal = (cartItems, voucherDiscount) => {
  const totalPrice = Number(calcProvisional(cartItems));
  const finalPrice = voucherDiscount ? totalPrice - (totalPrice * voucherDiscount / 100) : totalPrice;
  let finalPriceString = (Math.round(finalPrice * 100) / 100).toFixed(2);
  let finalPriceFloat = parseFloat(finalPriceString);
  return finalPriceFloat;
}