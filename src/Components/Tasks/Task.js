import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import loadingGif from "../../../src/giphy.gif";

const Task = (props) => {
  return (
    <div className="card" id="task">
      <div className="text-center">
          {props.isLoading && (
            <img src={loadingGif} alt="wait until the page loads" />
          )}
        </div>
        {!props.isLoading && (
          <>
      <div className="card-body">
        <TaskList
          claim={props.claim}
          archived={props.archived}
          isLoading={props.isLoading}
          task={props.task}
          loadTaskList={props.loadTaskList}
        />
      </div>
      {(!props.archived ||
        props.claim.claimStatus === "O" ||
        props.claim.claimStatus === "P") && (
        <div className="card-footer">
          <NewTaskForm
            claim={props.claim}
            archived={props.archived}
            loadTaskList={props.loadTaskList}
            openTasks={props.openTasks}
            setOpenTasks={props.setOpenTasks}
          />
        </div>
      )}
      </>
        )}
    </div>
  );
};
export default Task;
