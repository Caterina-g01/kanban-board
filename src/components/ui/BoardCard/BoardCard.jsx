import React from "react";
import s from "./styles.module.scss";
import CardButton from "../CardButton/CardButton";
import classNames from "classnames";
import CardInput from "../CardInput/CardInput";

export function BoardCard({ title, className }) {
    const titleClassName = classNames(s.cardTitle, className);
  return (
    <div className={s.boardCard__container}>
      <div className={titleClassName}>{title}</div>
      <div className={s.boardCard__content}>
        <div className={s.boardCard__tasks}>
            <CardInput />
        </div>
      </div>
      <CardButton
      className={s.boardCard__button}
      >+ Add task</CardButton>
    </div>
  );
}


export default BoardCard;
