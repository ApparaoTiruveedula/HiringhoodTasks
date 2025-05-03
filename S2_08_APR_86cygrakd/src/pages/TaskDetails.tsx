import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteTask } from "../features/tasks/taskSlice";
import { Button, Chip } from "@mui/material";

const TaskDetails = () => {
  const { id } = useParams();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!task)
    return (
      <p className="text-center text-red-500 mt-4">Task not found</p>
    );

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task.id));
      navigate("/");
    }
  };

  const tagList =
    task.tags?.length > 0
      ? task.tags.map((tag: string, i: number) => (
          <Chip
            key={i}
            label={tag}
            size="small"
            className="!bg-gray-200 !text-gray-800"
          />
        ))
      : [<span key="no-tag" className="text-sm text-gray-500">No tags</span>];

  return (
    <>
      <div className="flex flex-row justify-between mx-6 my-4 mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="px-4 py-2 font-bold text-2xl text-gray-800">
          Task Manager
        </h1>
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          className="!text-blue-600 !border-blue-600 hover:!bg-blue-50"
        >
          Back to Home
        </Button>
      </div>

      <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          {task.title}
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {task.description}
          </p>
          <p>
            <span className="font-semibold">Due Date:</span> {task.dueDate}
          </p>
          <p>
            <span className="font-semibold">Priority:</span> {task.priority}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {task.status}
          </p>
          <div className="flex flex-wrap gap-2 mt-2 items-center">
            <span className="font-semibold mr-2">Tags:</span>
            {tagList}
          </div>
        </div>

        <div className="mt-6 flex gap-3 flex-wrap">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/edit/${task.id}`)}
            className="!bg-blue-600 hover:!bg-blue-700"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            className="hover:!bg-red-700"
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/")}
            className="hover:!bg-gray-100"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
