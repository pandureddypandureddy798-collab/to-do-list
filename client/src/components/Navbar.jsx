import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" onClick={onToggleSidebar}>
            <FiMenu size={20} />
          </button>
          <Link to="/dashboard" className="text-lg font-semibold text-slate-800">
            TaskFlow
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-600 md:block">{user?.name}</span>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
