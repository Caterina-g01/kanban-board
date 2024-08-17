import s from "./styles.module.scss";
import classNames from "classnames";

export function DropDown({ children, className }) {
    const dropDownClassName = classNames(s.dropDown, className);
  return (
    <div className={dropDownClassName}>{children}</div>
  )
}