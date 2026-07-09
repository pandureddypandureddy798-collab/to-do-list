import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import Loader from '../components/Loader';
import { useTasks } from '../context/TaskContext';
import api from '../services/api';

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTask } = useTasks();
  const [task, setTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data.data.task);
    };

    loadTask();
  }, [id]);

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      await updateTask(id, payload);
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!task) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Edit task</h1>
        <p className="mt-2 text-sm text-slate-500">Keep your task list accurate and actionable.</p>
      </div>
      <TaskForm initialValues={task} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default EditTaskPage;
