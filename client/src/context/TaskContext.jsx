import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', category: '', sortBy: 'newest', page: 1 });

  const fetchTasks = useCallback(async (query = {}) => {
    setLoading(true);
    try {
      const params = { page: query.page || filters.page, limit: 10, ...query };
      const response = await api.get('/tasks', { params });
      const data = response.data.data;
      setTasks(data.tasks || []);
      setPagination({ page: data.page, totalPages: data.totalPages, hasNextPage: data.hasNextPage, hasPrevPage: data.hasPrevPage });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters.page]);

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await api.get('/tasks/statistics');
      setStats(response.data.data.stats || {});
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load statistics');
    }
  }, []);

  const createTask = useCallback(async (payload) => {
    try {
      const response = await api.post('/tasks', payload);
      toast.success('Task created');
      await fetchTasks({ page: 1 });
      await fetchStatistics();
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  }, [fetchStatistics, fetchTasks]);

  const updateTask = useCallback(async (id, payload) => {
    try {
      const response = await api.put(`/tasks/${id}`, payload);
      toast.success('Task updated');
      await fetchTasks({ page: filters.page });
      await fetchStatistics();
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  }, [fetchStatistics, fetchTasks, filters.page]);

  const deleteTask = useCallback(async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      await fetchTasks({ page: filters.page });
      await fetchStatistics();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  }, [fetchStatistics, fetchTasks, filters.page]);

  const value = useMemo(() => ({
    tasks,
    stats,
    loading,
    pagination,
    filters,
    setFilters,
    fetchTasks,
    fetchStatistics,
    createTask,
    updateTask,
    deleteTask
  }), [tasks, stats, loading, pagination, filters, fetchTasks, fetchStatistics, createTask, updateTask, deleteTask]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
