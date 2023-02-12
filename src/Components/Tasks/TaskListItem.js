import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContexts";
import { updateTaskStatus } from "../../Data/DataFunctions";

const TaskListItem = (props) => {
  const [message, setMessage] = useState("");
  const [taskStatus, setTaskStatus] = useState(props.task.taskStatus);
  const currentUser = useContext(UserContext);

  const codeToString = {
    O: 'Open',
    C: 'Closed'
  }

  const statusString = codeToString[taskStatus]

  const updateTask = () => {
    const updatedTaskStatus = taskStatus === "C" ? "O" : "C";
    updateTaskStatus(
      { ...props.task, taskStatus: updatedTaskStatus },
      currentUser.user.name,
      currentUser.user.password
    )
      .then((response) => {
        if (response.status === 200) {
          setMessage("Task " + response.data.id + " was set to ");
          setTaskStatus(updatedTaskStatus);
          props.loadTaskList();
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
          <div className="col-4">{props.task.taskText}</div>
          <div className="col-2">{statusString}</div>
          {!props.archived &&
          <div className="col-3">
            <button 
            className="btn btn-primary btn-sm" 
            onClick={updateTask}
            >
              {taskStatus === "C" ? "Re-open" : "Close"}
            </button>
          </div>
          }
          {/* {message} */}
        </div>
      </li>
    </>
  );
};
export default TaskListItem;
