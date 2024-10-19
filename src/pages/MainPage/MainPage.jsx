import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import s from "./styles.module.scss";
import Header from "../../components/Header/Header";
import MainSection from "../../components/MainSection/MainSection";
import Footer from "../../components/Footer/Footer";
import TaskWindow from "../../components/TaskWindow/TaskWindow";
import useLocalStorage from "use-local-storage";


export default function MainPage() {
    const [tasks] = useLocalStorage("tasks", {
        backlog: [],
        ready: [],
        inProgress: [],
        finished: []
    });


    const activeCount = tasks.backlog.length + tasks.ready.length + tasks.inProgress.length;
    const finishedCount = tasks.finished.length;

    return (
        <Router>
            <div className={s.mainPage__container}>
                <Header />
                
                <Routes>
                    <Route path="/" element={<MainSection />} />
                    <Route 
                      path="/tasks/:taskId" 
                      element={<TaskWindow tasks={tasks.backlog} />} 
                    />
                </Routes>
                <Footer activeCount={activeCount} finishedCount={finishedCount} />
            </div>
        </Router>
    );
}