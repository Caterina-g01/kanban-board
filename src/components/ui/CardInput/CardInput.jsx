import React, { useState } from 'react';
import s from './styles.module.scss';
import classNames from 'classnames';

const CardInput = ({ 
  placeholder = 'New task title', 
  customClassName, 
  maxLength 
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      className={classNames(
        s.custom__input, 
        customClassName, 
        { [s.filled]: value } 
      )}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}  
    />
  );
};

export default CardInput;