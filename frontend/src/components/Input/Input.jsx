/* eslint-disable react/prop-types */
import './Input.css';
import ReactStars from 'react-rating-stars-component';
import PropTypes from 'prop-types';

const Input = (props) => {
  const _onChange = (e) => {
    if (e.target.name === 'image') {
      props?.onInputChange?.(e.target.name, e.target.files[0]);
    } else {
      props?.onInputChange?.(e.target.name, e.target.value);
    }
  };

  if (props?.type === 'textarea') {
    const styles = `input-box${props?.error ? ' invalid' : ''}`;

    return (
      <div className={styles}>
        {props?.label && <label>{props.label}</label>}
        <textarea
          type={'textarea'}
          onChange={(e) => {
            _onChange(e);
          }}
          rows={props?.rows}
          name={props?.name}
          value={props?.value}
          placeholder={props?.placeholder}
          className={'textarea-text'}
        />
        <span className="invalid-message">{props?.error && props?.error[0]}</span>
      </div>
    );
  } else if (props?.type === 'number') {
    const styles = `input-box${props?.error ? ' invalid' : ''}`;

    const handleOnInput = (e) => {
      if (!props?.decimals) {
        e.target.value = e.target.value.replace(/[^0-9]*/g, '');
      }
    };
    return (
      <div className={styles}>
        {props?.label && <label>{props?.label}</label>}
        <input
          autoComplete={props?.autoComplete}
          step={props?.step}
          min={props?.min || 0}
          max={props?.max || null}
          pattern="[0-9]"
          onInput={handleOnInput}
          type={props?.type}
          onChange={(e) => {
            _onChange(e);
          }}
          disabled={props?.disabled}
          name={props?.name}
          value={props?.value}
          placeholder={props?.placeholder}
          className={'input-number'}
        />
        <span className="invalid-message">{props?.error && props?.error[0]}</span>
      </div>
    );
  } else if (props?.type === 'stars') {
    const styles = `input-box${props?.error ? ' invalid' : ''}`;

    return (
      <div className={styles}>
        {props?.label && <label>{props.label}</label>}
        <ReactStars
          name={props?.name}
          starCount={5}
          size={30}
          color={'#adb5bd'}
          activeColor={'#ffb302'}
          a11y={true}
          isHalf={false}
          emptyIcon={<i className="fa fa-star" />}
          halfIcon={<i className="fa fa-star-half-alt" />}
          filledIcon={<i className="fa fa-star" />}
          value={props?.value}
          onChange={(value) => {
            props?.onInputChange?.(props?.name, value);
          }}
        />
        <span className="invalid-message">{props?.error && props?.error[0]}</span>
      </div>
    );
  } else {
    const styles = `input-box${props?.inlineElement ? ` inline-btn-box` : ''} ${props?.error ? 'invalid' : ''}`;

    return (
      <div className={styles}>
        {props?.label && <label>{props.label}</label>}
        <div className="input-text-block">
          <input
            className={'input-text'}
            autoComplete={props?.autoComplete}
            type={props?.type}
            onChange={(e) => {
              _onChange(e);
            }}
            disabled={props?.disabled}
            name={props?.name}
            value={props?.value}
            placeholder={props?.placeholder}
          />
          {props?.inlineElement}
        </div>
        <span className="invalid-message">{props?.error}</span>
      </div>
    );
  }
};

Input.defaultProps = {
  step: 1,
  decimals: true,
  rows: '4',
  inlineElement: null,
  autoComplete: 'on',
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onInputChange: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  step: PropTypes.number,
  decimals: PropTypes.bool,
  rows: PropTypes.string,
  inlineElement: PropTypes.element,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
