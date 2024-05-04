import logo from '../../assets/svg/logo.svg';
import './Logo.css';

function Logo() {
  return (
    <div className="brand-logo">
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default Logo;
