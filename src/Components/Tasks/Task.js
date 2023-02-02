import { useState } from "react";
import { updateTaskStatus } from "../../Data/DataFunctions";

const Task = (props) => {
  const [message, setMessage] = useState("");
  const [task, setTask] = useState([]);
  const [taskStatus, setTaskStatus] = useState(props.task.taskStatus);

  const codeToString = {
    O: 'Open',
    C: 'Closed'
  }

  const statusString = codeToString[taskStatus]

  const updateTask = () => {
    const updatedTaskStatus = taskStatus === "C" ? "O" : "C";
    updateTaskStatus(
      { ...props.task, taskStatus: updatedTaskStatus },
      props.currentUser.user.name,
      props.currentUser.user.password
    )
      .then((response) => {
        if (response.status === 200) {
          setMessage("Task " + response.data.id + " was set to ");
          setTaskStatus(updatedTaskStatus);
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

  return (
    <>
      <li className="list-group-item" style={taskStatus === "C" ? {color: "#ccc"} : {}}>
        <div className="row align-items-center">
          <div className="col-3">
            <b>{props.task.taskDate}</b>
          </div>
          <div className="col-5">{props.task.taskText}</div>
          <div className="col-2">{statusString}</div>
          <div className="col-2">
            <button className="btn btn-primary btn-sm" onClick={updateTask}>
              {taskStatus === "C" ? "Open" : "Close"}
            </button>
          </div>
          {/* {message} */}
        </div>
      </li>
    </>
  );
};
export default Task;
