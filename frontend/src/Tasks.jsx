import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import api from "./api/axios"

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => {
        setError('Failed to fetch tasks');
        console.error(err);
      });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    const newTask = {
      title: title.trim(),
      isDone: false
    };

    api.post('/tasks', newTask)
      .then(res => {
        setTasks(prevTasks => [...prevTasks, res.data]);
        setTitle('');
        setError('');
      })
      .catch(err => {
        setError('Failed to create task');
        console.error(err);
      });
  };

  const handleToggleTask = (id, currentIsDone) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updatedTask = { ...task, isDone: !currentIsDone };

    api.put(`/tasks/${id}`, updatedTask)
      .then(res => {
        setTasks(prevTasks => prevTasks.map(t => t.id === id ? res.data : t));
        setError('');
      })
      .catch(err => {
        setError('Failed to update task');
        console.error(err);
      });
  };

  const handleDeleteTask = (id) => {
    api.delete(`/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
        setError('');
      })
      .catch(err => {
        setError('Failed to delete task');
        console.error(err);
      });
  };

  return (
    <div className="tasks-container">
      <div className="header">
        <h2>Tasks</h2>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleCreateTask} className="task-form">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input"
        />
        <button type="submit" className="btn-submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <label className="task-checkbox">
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => handleToggleTask(task.id, task.isDone)}
              />
              <span className={task.isDone ? 'task-title completed' : 'task-title'}>
                {task.title}
              </span>
            </label>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn-delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && !error && <p className="no-tasks">No tasks yet. Create one!</p>}
    </div>
  );
}

export default Tasks;
