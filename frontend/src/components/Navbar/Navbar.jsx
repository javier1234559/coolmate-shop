import SearchInput from '../SearchInput/SearchInput';
import { User } from 'phosphor-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartButton } from '../CartButton/CartButton';
import logo from '../../assets/svg/logo.svg';
import './Navbar.css';

const navigations = [
  {
    id: 1,
    name: 'SALE',
    link: '/',
  },
  {
    id: 2,
    name: 'Sản phẩm',
    link: '/products',  
  },
  {
    id: 3,
    name: 'Đồ lót',
    link: '/about',
  },
  {
    id: 4,
    name: 'Đồ thể thao',
    link: '/about',
  },
  {
    id: 5,
    name: 'Mặc hằng ngày',
    link: '/about',
  },
  {
    id: 6,
    name: 'Nước hoa',
    link: '/about',
  },
  {
    id: 7,
    name: 'Giới thiệu',
    link: '/about',
  },
];

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleOpenNavigation() {
    setIsNavOpen(!isNavOpen);
  }

  function handletoggleShowCart() {
    setShowCart(!showCart);
  }

  const navLinkClass = ({ isActive }) => {
    return isActive ? 'nav-activate' : '';
  };

  return (
    <header className={`header ${showCart ? 'visible' : ''}`}>
      <nav className={`nav container ${isNavOpen ? 'nav-open' : ''}`}>
        <span className="brand-name">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </span>
        <ul className="nav-link_container">
          {navigations.map((nav) => (
            <li key={nav.id} className="nav-link">
              <NavLink to={nav.link} className={navLinkClass}>
                {nav.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <SearchInput />
        <div className="nav-secondary_btn" onClick={handleOpenNavigation}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <User size={32} style={{ color: 'white' }} />
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
