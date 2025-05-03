import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import { Task } from "../features/tasks/taskTypes";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";

const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  dueDate: Yup.date().min(new Date(), "Due date must be in the future"),
});

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const initialValues: Task = task || {
    id: uuidv4(),
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "low",
    status: "todo",
    tags: [],
  };

  return (
    <>
      <div className="flex flex-row justify-between mx-6 my-4 border-b-2 border-gray-300 pb-4">
        <h1 className="px-4 py-2 font-bold text-2xl text-gray-800">
          Task Manager
        </h1>
        <div>
          <Button onClick={() => navigate("/")} className="btn mx-3" variant="outlined">
            Back to Home
          </Button>
          <Button onClick={() => navigate("/add")} className="btn" variant="contained">
            Add Task
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-xl mx-auto shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={TaskSchema}
          onSubmit={(values) => {
            const updatedValues = {
              ...values,
              tags:
                typeof values.tags === "string"
                  ? values.tags.split(",").map((tag) => tag.trim())
                  : values.tags,
            };

            if (task) {
              dispatch(updateTask(updatedValues));
              setSnackbarMessage("Task updated successfully!");
            } else {
              dispatch(addTask(updatedValues));
              setSnackbarMessage("Task added successfully!");
            }

            setSnackbarOpen(true);
            setTimeout(() => navigate("/"), 1500); // delay to show snackbar
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form className="flex flex-col gap-4">
              <TextField
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                error={touched.title && !!errors.title}
                helperText={<ErrorMessage name="title" />}
              />

              <TextField
                name="description"
                label="Description"
                multiline
                rows={3}
                value={values.description}
                onChange={handleChange}
              />

              <TextField
                name="dueDate"
                label="Due Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={values.dueDate}
                onChange={handleChange}
                error={touched.dueDate && !!errors.dueDate}
                helperText={<ErrorMessage name="dueDate" />}
              />

              <FormControl>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={values.priority}
                  label="Priority"
                  onChange={handleChange}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={values.status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="todo">To Do</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name="tags"
                label="Tags (comma separated)"
                value={values.tags}
                onChange={handleChange}
              />

              <div className="flex justify-end gap-4">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  {task ? "Update" : "Create"} Task
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TaskForm;
