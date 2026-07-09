import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, onSubmit, filters, onFilterChange }) => (
  <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
        <FiSearch className="text-slate-400" />
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search by title, description or category" className="w-full bg-transparent outline-none" />
      </div>
      <div className="flex flex-wrap gap-3">
        <select name="status" value={filters.status} onChange={(event) => onFilterChange('status', event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select name="priority" value={filters.priority} onChange={(event) => onFilterChange('priority', event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none">
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select name="category" value={filters.category} onChange={(event) => onFilterChange('category', event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none">
          <option value="">All Category</option>
          {['personal', 'work', 'study', 'shopping', 'health', 'other'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select name="sortBy" value={filters.sortBy} onChange={(event) => onFilterChange('sortBy', event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  </form>
);

export default SearchBar;
