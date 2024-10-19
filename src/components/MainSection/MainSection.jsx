import { useState } from "react";
import useLocalStorage from "use-local-storage"; 
import s from "./styles.module.scss";
import BoardCard from "../ui/BoardCard/BoardCard";
import { useNavigate } from 'react-router-dom'; 

export default function MainSection() {
  const navigate = useNavigate(); 
  const [tasks, setTasks] = useLocalStorage("tasks", {
    backlog: [],
    ready: [],
    inProgress: [],
    finished: []
  });

  const addTaskToBacklog = (task) => {
    setTasks((prevState) => ({
      ...prevState,
      backlog: [...prevState.backlog, task],
    }));
  };

  const deleteTask = (from, task) => {
    setTasks((prevState) => ({
      ...prevState,
      [from]: prevState[from].filter(t => t !== task),
    }));
  };

  const moveTask = (from, to, task) => {
    setTasks((prevState) => ({
      ...prevState,
      [from]: prevState[from].filter((t) => t !== task),
      [to]: [...prevState[to], task],
    }));
  };

  const handleTaskClick = (task) => {
    const taskId = findTaskId(task);
    if (taskId >= 0) {
      navigate(`/tasks/${taskId}`); 
    }
  };

  const findTaskId = (task) => {
    const allTasks = Object.entries(tasks).flatMap(([key, value]) => 
      value.map((t) => t.id === task.id ? t.id : null).filter(Boolean)
    );

    const foundTask = allTasks.find(t => t === task.id);
    return foundTask ? foundTask : -1;
  };

  const handleUpdateTask = ({ id, description }) => {
    const updatedTasks = Object.entries(tasks).reduce((acc, [key, value]) => {
      acc[key] = value.map(task => 
        task.id === id ? { ...task, description } : task
      );
      return acc;
    }, {});

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    navigate("/"); 
  };

  const columnsConfig = [
    {
      title: 'Backlog',
      columnKey: 'backlog',
      newTasks: [],
      isBacklog: true,
      onNewTask: addTaskToBacklog,
      colorClass: s.pink, 
    },
    {
      title: 'Ready',
      columnKey: 'ready',
      newTasks: tasks.backlog,
      onTaskSelect: (task) => moveTask('backlog', 'ready', task),
      colorClass: s.blue, 
    },
    {
      title: 'In Progress',
      columnKey: 'inProgress',
      newTasks: tasks.ready,
      onTaskSelect: (task) => moveTask('ready', 'inProgress', task),
      colorClass: s.yellow,
    },
    {
      title: 'Finished',
      columnKey: 'finished',
      newTasks: tasks.inProgress,
      onTaskSelect: (task) => moveTask('inProgress', 'finished', task),
      colorClass: s.green,
    },
  ];

  return (
    <div className={s.mainSection__container}>
      {columnsConfig.map(({ title, columnKey, newTasks, isBacklog, onNewTask, onTaskSelect, colorClass }) => (
        <BoardCard
          key={columnKey}
          title={title}
          className={`${s["custom__title"]} ${colorClass}`} 
          tasks={tasks[columnKey]}
          canAddTask={isBacklog || tasks[columnKey].length > 0}
          onAddTask={onNewTask}
          onDeleteTask={(task) => deleteTask(columnKey, task)} 
          onTaskClick={handleTaskClick} 
          taskSelector={isBacklog ? null : {
            tasks: newTasks,
            onSelect: onTaskSelect,
          }}
        />
      ))}
    </div>
  );
}
