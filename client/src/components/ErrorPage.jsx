import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
    <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
      <h1 className="text-4xl font-semibold text-slate-800">404</h1>
      <p className="mt-3 text-slate-500">The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white">
        Back to Dashboard
      </Link>
    </div>
  </div>
);

export default ErrorPage;
