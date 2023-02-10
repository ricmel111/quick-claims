import TaskListItem from "./TaskListItem";

const TaskList = (props) => {

  return (
    <>
      <div className="mb-1">
        <div className="text-center">
        </div>
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
                  loadTaskList={props.loadTaskList}
                  openTasks={props.openTasks}
                  setOpenTasks={props.setOpenTasks}
                />
              ))}
            </ul>
      </div>
    </>
  )
}

export default TaskList;
