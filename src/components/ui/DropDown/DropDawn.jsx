import React from 'react'
import s from './styles.module.scss'

export default function DropDawn() {
  return (
    <div className={s.dropdown__container}>
      <span className={s.dropdown__option}>Profile</span>
      <span className={s.dropdown__option}>Log out</span>
    </div>
  )
}
