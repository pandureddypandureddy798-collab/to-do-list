import TaskCard from './TaskCard';

const TaskList = ({ tasks, onDelete }) => {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
        No tasks found. Create your first task to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
