import TaskListItem from "./TaskListItem";
import loadingGif from "../../../src/giphy.gif";

const TaskList = (props) => {


  return (
    <>
      <div className="mb-1">
        <div className="text-center">
          {props.isLoading && (
            <img src={loadingGif} alt="wait until the page loads" />
          )}
        </div>
        {!props.isLoading && (
          <>
            {props.task.length === 0 && (
              <div className="text-center p-2">
                <span>No tasks</span>
              </div>
            )}
            <ul className="notes list-group list-group-flush">
              {props.task.map((task, index) => (
                <TaskListItem
                  task={task}
                  key={index}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default TaskList;
