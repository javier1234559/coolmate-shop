import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ children, variant, className, onClick, ...rest }) => {
  const buttonClassName = `button ${variant} ${className}`;
  
  return <button className={buttonClassName} onClick={onClick} {...rest}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['black', 'white']).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func, // Add onClick prop
};

export default Button;