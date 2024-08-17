import React from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

export function CardButton({ children, onClick, className }) {
  const buttonClassName = classNames(s.cardButton, className);

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
}

export default CardButton;
