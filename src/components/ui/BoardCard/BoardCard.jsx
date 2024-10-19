import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import CardBtn from "../CardBtn/CardBtn";
import classNames from "classnames";
import TaskSelector from "../TaskSelector/TaskSelector";

export function BoardCard({
  title,
  className,
  canAddTask,
  tasks,
  onAddTask,
  onTaskClick,
  onDeleteTask, 
  taskSelector,
}) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [isTaskSelectorVisible, setIsTaskSelectorVisible] = useState(false);
  const inputRef = useRef(null);
  const taskSelectorRef = useRef(null);

  const titleClassName = classNames(s.cardTitle, className);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsAddingTask(false);
        setTaskTitle("");
      }
      if (taskSelectorRef.current && !taskSelectorRef.current.contains(event.target)) {
        setIsTaskSelectorVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isAddingTask && inputRef.current) {
      inputRef.current.querySelector('input').focus(); 
    }
  }, [isAddingTask]);

  const handleAddTaskClick = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: taskTitle.trim(),
        description: "", 
      };
      onAddTask(newTask);
      setTaskTitle("");
      setIsAddingTask(false);
    } else {
      setIsAddingTask(true);
    }
  };

  const handleInputChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTaskClick();
    }
  };

  const handleTaskClick = (task) => {
    console.log("Task clicked: ", task);
    if (onTaskClick) {
      onTaskClick(task);
    }
    setIsTaskSelectorVisible(false); 
  };

  const toggleTaskSelector = () => {
    setIsTaskSelectorVisible((prev) => !prev);
  };

  return (
    <div className={s.boardCard__container}>
      <div className={titleClassName}>{title}</div>
      <div className={s.boardCard__content}>
        <div className={s.boardCard__tasks}>
          {tasks.map((task, index) => (
            <div key={task.id || index} className={s.boardCard__taskLink}>
              <a href="#" onClick={() => handleTaskClick(task)}>
                {task.title} 
              </a>
              <span 
                className={s.boardCard__deleteTask} 
                onClick={() => onDeleteTask(task)} 
              >
                &times;
              </span>
            </div>
          ))}
          {title === "Backlog" && (
            <div ref={inputRef}>
              {isAddingTask ? (
                <>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter task title"
                    className={s.boardCard__input}
                  />
                  <CardBtn
                    btnText="Submit"
                    onClick={handleAddTaskClick}
                    className={s.boardCard__btnSubmit}
                  />
                </>
              ) : (
                <CardBtn
                  btnText="+ Add task"
                  onClick={() => setIsAddingTask(true)}
                  className={s.boardCard__btnAddTask}
                />
              )}
            </div>
          )}
          {taskSelector && taskSelector.tasks.length > 0 && (
            <div className={s.boardCard__btns} ref={taskSelectorRef}>
              <CardBtn
                btnText={isTaskSelectorVisible ? "Close" : "+ Add task"} 
                onClick={toggleTaskSelector}
                className={s.boardCard__btnAddTask}
              />
              {isTaskSelectorVisible && (
                <TaskSelector
                  className={s.boardCard__taskSelector}
                  tasks={taskSelector.tasks}
                  onSelect={(task) => {
                    console.log("Task selected: ", task);
                    taskSelector.onSelect(task);
                    setIsTaskSelectorVisible(false); 
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

BoardCard.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  canAddTask: PropTypes.bool,
  tasks: PropTypes.array.isRequired,
  onAddTask: PropTypes.func,
  onTaskClick: PropTypes.func, 
  onDeleteTask: PropTypes.func, 
  taskSelector: PropTypes.shape({
    tasks: PropTypes.array,
    onSelect: PropTypes.func,
  }),
};

export default BoardCard;
