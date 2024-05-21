
function addDecimals(num: number): number {
  return (Math.round(num * 100) / 100);
}

// export function calcPrices(orderItems: OrderItem[]) {
//   // Calculate the items price in whole number (pennies) to avoid issues with
//   // floating point number calculations
//   const itemsPrice = orderItems.reduce(
//     (acc, item) => acc + (item.product.price * 100 * item.quantity) / 100,
//     0
//   );

//   // Calculate the shipping price
//   const shippingPrice = itemsPrice > 100 ? 0 : 10;

//   // Calculate the tax price
//   const taxPrice = 0.15 * itemsPrice;

//   // Calculate the total price
//   const totalPrice = itemsPrice + shippingPrice + taxPrice;

//   // return prices as strings fixed to 2 decimal places
//   return {
//     itemsPrice: addDecimals(itemsPrice),
//     shippingPrice: addDecimals(shippingPrice),
//     taxPrice: addDecimals(taxPrice),
//     totalPrice: addDecimals(totalPrice),
//   };
// }

export const calcProvisional = (listItemCart: any) => {
  const provisionalTotal = listItemCart.reduce((accumulator: number, current: any) => {
    return accumulator + current.price * current.quantity;
  }, 0);
  return addDecimals(provisionalTotal);
}

export const calculateTotal = (cartItems: any, voucherDiscount: number) => {
  const totalPrice = Number(calcProvisional(cartItems));
  const finalPrice = voucherDiscount ? totalPrice - (totalPrice * voucherDiscount / 100) : totalPrice;
  return addDecimals(finalPrice);
}