import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Task } from "../features/tasks/taskTypes";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

const Home = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortKey, setSortKey] = useState<"priority" | "dueDate">("dueDate");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredTasks = tasks
    .filter((task) => (statusFilter ? task.status === statusFilter : true))
    .filter((task) => (priorityFilter ? task.priority === priorityFilter : true))
    .filter((task) => {
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(query);
      const tagsMatch = task.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      ) ?? false;

      return titleMatch || tagsMatch;
    })
    .sort((a, b) => {
      if (sortKey === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });

  return (
    <div className="p-6">
      <div className="flex flex-row justify-between mb-8 border-b-2 border-gray-300 pb-4">
        <h1 className="px-4 py-2 font-bold text-2xl text-gray-800">
          Task Manager
        </h1>
        <Button
          variant="contained"
          onClick={() => navigate("/add")}
          className="!bg-blue-600 hover:!bg-blue-700"
        >
          Add Task
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 flex-wrap">
        <TextField
          label="Search by title or tag"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-60"
        />

        <FormControl className="w-full md:w-40" size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="w-full md:w-40" size="small">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            label="Priority"
          >
            <MenuItem value="">All Priorities</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="w-full md:w-48" size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            label="Sort By"
          >
            <MenuItem value="dueDate">Sort by Due Date</MenuItem>
            <MenuItem value="priority">Sort by Priority</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={() => {
            setStatusFilter("");
            setPriorityFilter("");
            setSortKey("dueDate");
            setSearchQuery("");
          }}
          className="!text-gray-800 !border-gray-400 hover:!bg-gray-100"
        >
          Reset
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Home;
