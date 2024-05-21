import SearchInput from '../SearchInput/SearchInput';
import { User } from 'phosphor-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartButton } from '../CartButton/CartButton';
import { useSelector } from 'react-redux';
import './Navbar.css';
import Logo from '../Logo/Logo';
import { useDispatch } from 'react-redux';
import { toggleCart } from '~/redux/cartSlice';
import SlidingCart from '../SlidingCart/SlidingCart';

const navigations = [
  {
    id: 1,
    name: 'COOLMATE',
    link: 'coolmate',
  },
  {
    id: 2,
    name: 'ÁO THUN',
    link: 'Áo Thun',
  },
  {
    id: 3,
    name: 'QUẦN',
    link: 'Quần',
  },
  {
    id: 4,
    name: 'ÁO KHOÁC',
    link: 'Áo Khoác',
  },
  {
    id: 5,
    name: 'QUẦN NGẮN',
    link: 'Quần Ngắn',
  },
  {
    id: 6,
    name: 'ÁO POLO',
    link: 'Áo polo',
  }
];

function Navbar() {
  const dispath = useDispatch();
  const avatar = useSelector((state) => state?.auth?.avatar_img);
  const showCart = useSelector((state) => state?.cart?.isShow);
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleOpenNavigation() {
    setIsNavOpen(!isNavOpen);
  }

  function handletoggleShowCart() {
    dispath(toggleCart());
  }

  const navLinkClass = ({ isActive }) => {
    // return isActive ? 'nav-activate' : '';
    return '';
  };

  return (
    <header className={`header ${showCart ? 'visible' : ''}`}>
      <nav className={`nav container ${isNavOpen ? 'nav-open' : ''}`}>
        <span className="brand-name">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </span>
        <ul className="nav-link_container">
          {navigations.map((nav) => (
            <li key={nav.id} className="nav-link">
              <NavLink to={`search?keyword=${nav.link}`} className={navLinkClass}>
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
        <NavLink to={'/profile'}>
          {avatar ? (
            // If the user is logged in, show their avatar
            <img src={avatar} alt="User avatar" className="avatar-image" />
          ) : (
            // If the user is not logged in, show the default user icon
            <User size={32} style={{ color: 'white' }} />
          )}
        </NavLink>
        <div className="nav-secondary">
          <CartButton toggleShowCart={handletoggleShowCart} />
        </div>
        <div className="nav-overlay"></div>
      </nav>
      <SlidingCart toggleShowCart={handletoggleShowCart} />
      <div className="cart-slide_overlay" onClick={handletoggleShowCart}></div>;
    </header>
  );
}

export default Navbar;
