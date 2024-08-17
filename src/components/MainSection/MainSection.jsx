import React from "react";
import s from "./styles.module.scss";
import BoardCard from "../ui/BoardCard/BoardCard";

export default function MainSection() {
  return (
    <div className={s.mainSection__container}>
      <BoardCard
        title={"Backlog"}
        className={`${s["custom__title"]} ${s.pink}`}
      />
      <BoardCard
        title={"Ready"}
        className={`${s["custom__title"]} ${s.blue}`}
      />
      <BoardCard
        title={"In Progress"}
        className={`${s["custom__title"]} ${s.green}`}
      />
      <BoardCard
        title={"Finished"}
        className={`${s["custom__title"]} ${s.yellow}`}
      />
    </div>
  );
}
