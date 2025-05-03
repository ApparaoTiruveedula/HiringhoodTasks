import { Task } from "../features/tasks/taskTypes";
import { Link } from "react-router-dom";

const TaskCard = ({ task }: { task: Task }) => (
  <Link to={`/task/${task.id}`} className="border p-4 rounded-md shadow hover:bg-gray-100">
    <h3 className="font-bold text-lg">{task.title}</h3>
    <p>Priority: {task.priority}</p>
    <p>Status: {task.status}</p>
    <p>Due: {task.dueDate}</p>
  </Link>
);

export default TaskCard;
