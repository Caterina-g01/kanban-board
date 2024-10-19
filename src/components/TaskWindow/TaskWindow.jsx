import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import s from './styles.module.scss';
import CardBtn from '../ui/CardBtn/CardBtn';

export default function TaskWindow({ tasks, onUpdate }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  useEffect(() => {
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) || {};
    const foundTask = Object.values(tasksFromStorage).flat().find((t) => t.id === Number(taskId));
    if (foundTask) {
      setDescription(foundTask.description || ""); 
    } else {
      setDescription(""); 
    }
  }, [taskId]);

  const handleUpdate = () => {
    if (description) {
      if (typeof onUpdate === 'function') {
        onUpdate({ id: Number(taskId), description });
      }

    
      const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) || {};
      const updatedTasks = Object.entries(tasksFromStorage).reduce((acc, [key, value]) => {
        acc[key] = value.map((task) =>
          task.id === Number(taskId) ? { ...task, description } : task
        );
        return acc;
      }, {});
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    navigate("/"); 
  };

  const handleClose = () => {
    navigate("/"); 
  };

  return (
    <div className={s.taskWindow__overlay}>
      <textarea 
        className={s.taskWindow__textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Edit task description" 
      />
      <div className={s.taskWindow__btns}>
        <CardBtn
          btnText="Save"
          onClick={handleUpdate}
          className={s.taskWindow__saveBtn}
        />
        <CardBtn
          btnText="Close"
          onClick={handleClose}
          className={s.taskWindow__closeBtn}
        />
      </div>
    </div>
  );
}
