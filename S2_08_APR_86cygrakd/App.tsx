import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home";
import TaskForm from "./src/pages/TaskForm";
import TaskDetails from "./src/pages/TaskDetails";
import Snackbar from "./src/components/Snackbar";
import "./index.css";

const App = () => (
  <Router>
    <Snackbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<TaskForm />} />
      <Route path="/edit/:id" element={<TaskForm />} />
      <Route path="/task/:id" element={<TaskDetails />} />
    </Routes>
  </Router>
);

export default App;
