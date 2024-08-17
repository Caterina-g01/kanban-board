import React from "react";
import s from "./styles.module.scss";
import avatar from "../../assets/images/user-avatar.png";



export default function Header() {
    return (
        <div className={s.header__container}>
            <div className={s.header__title}>Awesome Kanban Board</div>
            <div className={s.header__user}>
                <img src={avatar} className={s.header__user__img} alt="avatar" />
                <button></button>
            </div>
            </div>
    );
}