import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiList, FiTarget } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';

const statCards = [
  { key: 'totalTasks', label: 'Total Tasks', icon: FiList },
  { key: 'pendingTasks', label: 'Pending', icon: FiClock },
  { key: 'completedTasks', label: 'Completed', icon: FiCheckCircle },
  { key: 'highPriorityTasks', label: 'High Priority', icon: FiTarget }
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, stats, loading, pagination, filters, setFilters, fetchTasks, fetchStatistics, deleteTask } = useTasks();
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const loadTasks = useCallback(async () => {
    await fetchTasks({ ...filters, search: searchInput, page: filters.page });
  }, [fetchTasks, filters, searchInput]);

  useEffect(() => {
    loadTasks();
    fetchStatistics();
  }, [loadTasks, fetchStatistics]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFilters({ ...filters, search: searchInput, page: 1 });
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  const handleDeleteClick = (taskId) => {
    setSelectedTaskId(taskId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await deleteTask(selectedTaskId);
    setShowDeleteModal(false);
    setSelectedTaskId(null);
  };

  const summary = useMemo(() => {
    return stats || {
      totalTasks: 0,
      pendingTasks: 0,
      completedTasks: 0,
      inProgressTasks: 0,
      highPriorityTasks: 0,
      completionPercentage: 0,
      upcomingDueTasks: 0
    };
  }, [stats]);

  if (loading && !tasks.length) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-sm">
        <p className="text-sm uppercase tracking-[0.25em] text-sky-100">Welcome back</p>
        <h1 className="mt-2 text-3xl font-semibold">{user?.name}, here is your productivity snapshot.</h1>
        <p className="mt-3 max-w-2xl text-sm text-sky-100">Track tasks, stay focused, and keep your goals moving forward.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon }) => (
          <div key={key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{label}</p>
              <div className="rounded-lg bg-sky-50 p-2 text-sky-600"><Icon /></div>
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-800">{summary[key]}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Your Tasks</h2>
            <p className="text-sm text-slate-500">Search, filter, sort, and manage your to-dos.</p>
          </div>
          <button onClick={() => navigate('/tasks/new')} className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Create Task</button>
        </div>
        <SearchBar value={searchInput} onChange={setSearchInput} onSubmit={handleSearchSubmit} filters={filters} onFilterChange={handleFilterChange} />
        <div className="mt-6">
          <TaskList tasks={tasks} onDelete={handleDeleteClick} />
        </div>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
      <Modal open={showDeleteModal} title="Delete task" message="This action cannot be undone." onCancel={() => setShowDeleteModal(false)} onConfirm={confirmDelete} />
    </div>
  );
};

export default DashboardPage;
