// @ts-nocheck
import { ShoppingCart, X } from 'phosphor-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductQuantity, removeFromCart } from '~/redux/cartSlice';
import { calcProvisional } from '~/utils/utils';
import './SlidingCart.css';

function SlidingCart({ toggleShowCart }) {
  const listItem = useSelector((state) => state?.cart?.items);

  return (
    <div className={`sliding-cart_container`}>
      <CartTop toggleShowCart={toggleShowCart} />
      <CartMain cart={listItem} addProductQuantity={addProductQuantity} removeFromCart={removeFromCart} />
      <CartCheckOut listItemCart={listItem} toggleShowCart={toggleShowCart} />
    </div>
  );
}

function CartTop({ toggleShowCart }) {
  return (
    <div className="cart-top">
      <ShoppingCart size={22} />
      <h2>Your Shopping Carts</h2>
      <div className="close-shopping-cart" onClick={toggleShowCart}>
        <X size="22px" />
      </div>
    </div>
  );
}

export function CartMain({ cart, addProductQuantity, removeFromCart }) {
  const products = cart.map((itemCart, index) => {
    return <CartProducts index={index} itemCart={itemCart} addProductQuantity={addProductQuantity} removeFromCart={removeFromCart} key={index} />;
  });

  return <div className="cart-main_container">{products.length < 1 ? <div style={{ textAlign: 'center', fontSize: '1.6rem' }}>Your cart is empty :( </div> : products}</div>;
}

function CartProducts({ index, itemCart, addProductQuantity, removeFromCart }) {
  const dispatch = useDispatch();

  function inputHandler(e) {
    dispatch(addProductQuantity({ index: index, quantity: Number(e.target.value) }));
  }

  function removeProduct() {
    dispatch(removeFromCart({ index: index }));
    toast.success('Removed from Cart ');
  }

  return (
    <div className="cart-product">
      <img src={itemCart?.image} />
      <div className="cart-product_info">
        <p>Category: {itemCart.product?.category?.name}</p>
        <Link to={`/product/${itemCart?.product?.slug}`}>
          <h3>{itemCart?.product?.name}</h3>
        </Link>
        <p>Size: {itemCart.size}</p>
        <p>Color: {itemCart.color}</p>
        <p className="qty">
          Quantity:
          <input type="number" value={itemCart.quantity} onChange={inputHandler} id="qty" />
        </p>
      </div>
      <p className="cart-product_price">{(itemCart.product.price * itemCart.quantity)}</p>
      <span className="cart-product_x" onClick={removeProduct}>
        <X size="16px" />
      </span>
    </div>
  );
}

function CartCheckOut({ listItemCart, toggleShowCart }) {
  const totalPrice = calcProvisional(listItemCart);
  return (
    <div className="cart-checkout_container">
      <h3>Checkout</h3>
      <p>{totalPrice}đ</p>
      <Link to="order" onClick={toggleShowCart}>
        Go to Checkout
      </Link>
    </div>
  );
}

export default SlidingCart;
