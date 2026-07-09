import { NavLink } from 'react-router-dom';
import { FiGrid, FiPlusCircle, FiUser, FiSettings, FiList } from 'react-icons/fi';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/tasks/new', label: 'Create Task', icon: FiPlusCircle },
  { to: '/tasks', label: 'All Tasks', icon: FiList },
  { to: '/profile', label: 'Profile', icon: FiUser },
  { to: '/settings', label: 'Settings', icon: FiSettings }
];

const Sidebar = ({ open }) => {
  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-slate-200 bg-white p-5 transition-transform md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-lg font-semibold text-white">TF</div>
        <div>
          <p className="font-semibold text-slate-800">TaskFlow</p>
          <p className="text-sm text-slate-500">Stay organized</p>
        </div>
      </div>
      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-sky-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
