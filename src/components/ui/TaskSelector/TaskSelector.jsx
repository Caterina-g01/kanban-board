import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";

function TaskSelector({ tasks, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("Select a task");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task.title); 
    onSelect(task);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={s.select} onClick={toggleDropdown} ref={dropdownRef}>
      <div className={s.shown}>
        {selectedTask}
        <span className={s.arrowIcon}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id} 
                className={s.option}
                onClick={() => handleSelectTask(task)}
              >
                {task.title} 
              </div>
            ))
          ) : (
            <div className={s.option}>No tasks available</div>
          )}
        </div>
      )}
    </div>
  );
}

TaskSelector.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TaskSelector;
