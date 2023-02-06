import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContexts";
import { getTasksByClaimId } from "../../Data/DataFunctions";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";

const Task = (props) => {
    const [task, setTask] = useState(null);
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
            console.log(
              "SUCCESSFUL 200 received from getTasksByClaimId",
              response.data
            );
            setTask(response.data);
            setTimeout(() => {
              setIsLoading(false);
            }, 1500);
          })
          .catch((error) => {
            console.log("something went wrong", error);
          });
      };

  return (
    <div className="card" id="task">
      <div className="card-body">
        <TaskList claim={props.claim} archived={props.archived} isLoading={isLoading} task={task}/>
      </div>
      {!props.archived &&
      <div className="card-footer">
        <NewTaskForm claim={props.claim} archived={props.archived} loadTaskList={loadTaskList} />
      </div>
      }
    </div>
  );
};
export default Task;
