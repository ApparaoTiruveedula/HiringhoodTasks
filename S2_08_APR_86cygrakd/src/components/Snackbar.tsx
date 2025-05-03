import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { clearSnackbar } from "../features/tasks/taskSlice";

const Snackbar = () => {
  const snackbar = useSelector((state: RootState) => state.tasks.snackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (snackbar.message) {
      const timer = setTimeout(() => dispatch(clearSnackbar()), 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.message, dispatch]);

  if (!snackbar.message) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow text-white ${snackbar.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {snackbar.message}
    </div>
  );
};

export default Snackbar;
