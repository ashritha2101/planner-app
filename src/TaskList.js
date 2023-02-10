import { Link } from "react-router-dom";
const TaskList = ({ tasks }) => {
  var todayDate = new Date(); //Today Date.
  var dateOne = new Date(2010, 11, 25);
  const datecheck = todayDate > dateOne ? true : false;
  console.log(datecheck);
  console.log(tasks);
  for (let i = 0; i < tasks.length; i++) {
    console.log(tasks[i]);
    let currentdate = new Date();
    let taskdate = new Date(tasks[i].endDate);
    if (taskdate < currentdate) {
      console.log(taskdate);
      console.log(currentdate);
      if (tasks[i].status == "not-started" || tasks[i].status == "in-progress")
        tasks[i].background = "#dbb6af";
    }
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          style={{ backgroundColor: `${task.background}` }}
          className="task-preview"
          key={task.id}
        >
          <Link to={`/${task.id}`}>
            <h2>{task.title}</h2>
            <div className="task-date">
              <div>{task.startDate}</div>
              <div>-&gt; </div>
              <div>{task.endDate}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default TaskList;
