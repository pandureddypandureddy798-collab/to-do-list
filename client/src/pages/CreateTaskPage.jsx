import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../context/TaskContext';

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      await createTask(payload);
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Create a new task</h1>
        <p className="mt-2 text-sm text-slate-500">Capture priorities, deadlines, and progress in one place.</p>
      </div>
      <TaskForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default CreateTaskPage;
