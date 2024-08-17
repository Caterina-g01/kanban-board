import React from 'react';
import s from './styles.module.scss';

export default function Footer() {
  return (
    <div className={s.footer__container}>
      <div className={s.footer__tascksBlock}>
        <div className={s.footer__activeTasks}>Active tasks: </div>
        <div className={s.footer__completedTasks}>Finished tasks: </div>
      </div>
      <div className={s.footer__autorInfo}> Kanban board by Caterina Gonchar, 2024</div>
    </div>
  )
}
