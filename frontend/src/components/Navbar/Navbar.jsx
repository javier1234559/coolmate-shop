import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartButton } from '../CartButton/CartButton';
import './Navbar.css';

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleOpenNavigation() {
    setIsNavOpen(!isNavOpen);
  }

  function handletoggleShowCart() {
    setShowCart(!showCart);
  }

  return (
    <header className={`header ${showCart ? 'visible' : ''}`}>
      <nav className={`nav container ${isNavOpen ? 'nav-open' : ''}`}>
        <span className="brand-name">
          <Link to="/">Ace Store</Link>
        </span>
        <ul className="nav-link_container">
          <li className="nav-link">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/explore/men">Men</NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/explore/women">Women</NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/explore/all">Explore All</NavLink>
          </li>
        </ul>
        <div className="nav-secondary_btn" onClick={handleOpenNavigation}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="nav-secondary">
          <CartButton toggleShowCart={handletoggleShowCart} />
        </div>
        <div className="nav-overlay"></div>
      </nav>
      {/* <SlidingCart toggleShowCart={handletoggleShowCart} /> */}
      <div className="cart-slide_overlay"></div>;
    </header>
  );
}

export default Navbar;
