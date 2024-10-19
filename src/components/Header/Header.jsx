import React, { useState } from "react";
import s from "./styles.module.scss";
import avatar from "../../assets/images/user-avatar.png";
import arrow from "../../assets/images/arrow-down.png";
import DropDawn from "../ui/DropDown/DropDawn";

export default function Header() {
    const [isRotated, setIsRotated] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleArrowClick = () => {
        setIsRotated((prev) => !prev);
        setIsMenuVisible((prev) => !prev);
    };

    return (
        <div className={s.header__container}>
            <div className={s.header__title}>Awesome Kanban Board</div>
            <div className={s.header__userMenu}>
                <div className={s.header__user}>
                    <img src={avatar} className={s.header__user__img} alt="avatar" />
                    <img 
                        src={arrow} 
                        className={`${s.header__arrow__img} ${isRotated ? s.rotated : ''}`} 
                        alt="v" 
                        onClick={handleArrowClick} 
                    />
                </div>
            </div>
            {isMenuVisible && <DropDawn />} 
        </div>
    );
}
