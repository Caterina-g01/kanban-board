import React from "react";
import s from "./styles.module.scss";
import Header from "../../components/Header/Header";
import MainSection from "../../components/MainSection/MainSection";
import Footer from "../../components/Footer/Footer";


export default function MainPage() {
    return (
        <div className={s.mainPage__container}>
        <Header />
        <MainSection />
        <Footer />
        </div>
    );
}