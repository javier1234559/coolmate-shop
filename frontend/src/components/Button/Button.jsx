import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ children, variant, className, ...rest }) => {
  const buttonClassName = `button ${variant} ${className}`;
  
  return <button className={buttonClassName} {...rest}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['black', 'white']).isRequired,
  className: PropTypes.string,
};

export default Button;