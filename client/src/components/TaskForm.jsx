import { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  category: 'other',
  dueDate: ''
};

const TaskForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || '',
        description: initialValues.description || '',
        status: initialValues.status || 'pending',
        priority: initialValues.priority || 'medium',
        category: initialValues.category || 'other',
        dueDate: initialValues.dueDate ? initialValues.dueDate.slice(0, 10) : ''
      });
    }
  }, [initialValues]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500">
            {['personal', 'work', 'study', 'shopping', 'health', 'other'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Due Date</label>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500" />
        </div>
      </div>
      <button disabled={isSubmitting} className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? 'Saving...' : 'Save Task'}
      </button>
    </form>
  );
};

export default TaskForm;
