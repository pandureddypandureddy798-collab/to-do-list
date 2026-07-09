import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-800">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">Sign in to continue managing your tasks.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" required value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500" />
          </div>
          <button disabled={isSubmitting} className="w-full rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Don’t have an account? <Link to="/register" className="font-semibold text-sky-600">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
