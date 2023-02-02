import { useContext, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { addNewTask } from "../../Data/DataFunctions";
import { UserContext } from "../../Contexts/UserContexts";

const NewTaskForm = (props) => {
  const { handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const currentUser = useContext(UserContext);

  const initialTaskState = {
    taskStatus: "O",
    taskText: "",
    taskDate: new Date().toISOString().slice(0, 10),
    claimId: props.claim ? props.claim.id : ""
  };

  const formReducer = (state, data) => {
    return { ...state, [data.field]: data.value };
  };

  const [newTask, dispatch] = useReducer(formReducer, initialTaskState);

  const handleChange = (event) => {
    dispatch({ field: event.target.id, value: event.target.value });
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    const errors = validateData();
    if (Object.keys(errors).length) {
      setErrors(errors);
      // there are errors, do not continue saving s
      return;
    }
    setErrors("");
    console.log("Task being added", newTask);
    setMessage("Saving...");
    addNewTask(newTask, currentUser.user.name, currentUser.user.password)
      .then((response) => {
        if (response.status === 200) {
          setMessage("New transaction added with id " + response.data.id);
        } else {
          setMessage(
            "Something went wrong - status code was " + response.status
          );
        }
      })
      .catch((error) => {
        setMessage("Something went wrong - " + error);
      });
  };

  const validateData = () => {
    let errors = {};
    if (!newTask.taskText) {
      errors.taskText = "Task is required";
    }
    return errors;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="newTask" className="col-2 col-form-label">
            Add Task
          </label>
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              id="taskText"
              value={newTask.taskText}
              onChange={handleChange}
              placeholder="Add new task"
            />
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-secondary">
              Add
            </button>
          </div>
        </div>
        <div className="formError text-danger">{errors.task}</div>
        <div className="text-center text-danger">{message}</div>
      </form>
    </>
  );
};

export default NewTaskForm;
