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
    return isActive ? 'nav-activate' : '';
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
