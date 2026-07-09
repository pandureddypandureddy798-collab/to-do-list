import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

const statusStyles = {
  pending: 'bg-amber-100 text-amber-700',
  'in-progress': 'bg-sky-100 text-sky-700',
  completed: 'bg-emerald-100 text-emerald-700'
};

const priorityStyles = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700'
};

const normalizeStatusKey = (status) => status?.toLowerCase().replace(/\s+/g, '-') || 'pending';
const normalizePriorityKey = (priority) => priority?.toLowerCase() || 'medium';

const TaskCard = ({ task, onDelete }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
          <p className="mt-2 text-sm text-slate-500">{task.description || 'No description provided.'}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[normalizeStatusKey(task.status)]}`}>{task.status}</span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[normalizePriorityKey(task.priority)]}`}>{task.priority}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{task.category}</span>
        {task.dueDate && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Due {new Date(task.dueDate).toLocaleDateString()}</span>}
      </div>
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Updated {new Date(task.updatedAt).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <Link to={`/tasks/${task._id}`} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><FiEye /></Link>
          <Link to={`/tasks/${task._id}/edit`} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><FiEdit2 /></Link>
          <button onClick={() => onDelete(task._id)} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50"><FiTrash2 /></button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
