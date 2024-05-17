import { ShoppingCart } from 'phosphor-react';
import PropTypes from 'prop-types';
import './CartButton.css';
import { useSelector } from 'react-redux';

export function CartButton({ toggleShowCart }) {
  const cartItems = useSelector((state) => state.cart?.items) || [];

  const totalCartQty = cartItems.reduce((totalQty, current) => {
    return totalQty + current.quantity;
  }, 0);

  return (
    <span onClick={toggleShowCart} className="cart-icon">
      <ShoppingCart size={30} />
      <div className="cart-counter">{totalCartQty}</div>
    </span>
  );
}

CartButton.propTypes = {
  toggleShowCart: PropTypes.func.isRequired,
};
