import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import api from '../services/api';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data.data.task);
    };

    loadTask();
  }, [id]);

  if (!task) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-600">Task Details</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-800">{task.title}</h1>
          </div>
          <Link to={`/tasks/${task._id}/edit`} className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white">Edit Task</Link>
        </div>
        <p className="mt-6 text-slate-600">{task.description || 'No description added.'}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-1 font-semibold text-slate-700">{task.status}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Priority</p>
            <p className="mt-1 font-semibold text-slate-700">{task.priority}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Category</p>
            <p className="mt-1 font-semibold text-slate-700">{task.category}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Due Date</p>
            <p className="mt-1 font-semibold text-slate-700">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
