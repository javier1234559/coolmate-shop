import { ShoppingCart } from "phosphor-react";
import PropTypes from 'prop-types';
import "./CartButton.css";

export function CartButton({ toggleShowCart }) {
  // const cart = useCart();
  const cart = [];

  const totalCartQty = cart.reduce((totalQty, current) => {
    return totalQty + current.qty;
  }, 0);

  return (
    <span onClick={toggleShowCart} className="cart-icon">
      <ShoppingCart size={22} />
      <div className="cart-counter">{totalCartQty}</div>
    </span>
  );
}

CartButton.propTypes = {
  toggleShowCart: PropTypes.func.isRequired,
};
