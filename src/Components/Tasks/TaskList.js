import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContexts";
import { getTasksByClaimId } from "../../Data/DataFunctions";
import Task from "./Task";
import loadingGif from "../../../src/giphy.gif";

const TaskList = (props) => {
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    loadTaskList();
  }, []);

  const loadTaskList = () => {
    getTasksByClaimId(
      props.claim.id,
      currentUser.user.name,
      currentUser.user.password
    )
      .then((response) => {
        setTask(response.data);
        console.log("task data received", response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  return (
    <>
      <div className="mb-1">
        <h2 className="mb-4 text-center">Tasks</h2>
        <div className="text-center">
          {isLoading && (
            <img src={loadingGif} alt="wait until the page loads" />
          )}
        </div>
        {!isLoading && (
          <>
            {task.length === 0 && (
              <div className="text-center p-2">
                <p>No tasks</p>
              </div>
            )}
            <ul className="notes list-group list-group-flush">
              {task.map((task, index) => (
                <Task task={task} key={index} currentUser={currentUser} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default TaskList;
