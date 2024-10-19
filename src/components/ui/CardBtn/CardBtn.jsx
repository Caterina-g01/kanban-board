import s from './styles.module.scss';

export function CardBtn({ btnText, onClick, className }) {
  return (
    <div className={s.cardBtn__container}>
      <button 
        className={`${s.cardBtn__btn} ${className}`}
        onClick={onClick}
      >
        {btnText}
      </button>
    </div>
  );
}

export default CardBtn;

