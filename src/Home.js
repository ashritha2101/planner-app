import { useEffect, useState, useMemo, useContext } from "react";
import TaskList from "./TaskList";
import React from "react";
import useFetch from "./useFetch";
import { FilterContext } from "./Planner";
import axios from "axios";

const Home = () => {
  const [filter, setFilter] = useState("");
  const [tasks, setTask] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { query, isActive, setFunctionality } = useContext(FilterContext);
  useEffect(() => {
    setFunctionality(true);
    // console.log(query)
    setFilter(query);
    //  console.log(filter)
  });

  useEffect(() => {
    // console.log("hie")
    const loadPost = async () => {
      // console.log("bye")
      // const { data: tasks, isPending, error } = await useFetch();
      await axios
        .get("./db.json")
        .then((response) => {
          setTask(response.data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setIsPending(false);
          setTask("");
        });
    };
    loadPost();
  }, []);

  useEffect(() => {
    console.log(`changing...${isActive}`);
    if (!isPending) {
      isActive
        ? tasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        : tasks.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    }
  });

  if (!isPending) {
    return (
      <div className="home">
        <div className="categories">
          {error ? <div>{error.message}</div> : ""}

          {<h2>NOT STARTED</h2>}
          <div className="containerbackground" id="containerbackground">
            It always seem impossible until it's done
          </div>

          {isPending ? <div>Loading...</div> : ""}
          <div className="list-container">
            {filter ? (
              <TaskList
                tasks={tasks.filter(
                  (tasks) =>
                    tasks.title.toLowerCase().includes(filter.toLowerCase()) &&
                    tasks.status === "not-started"
                )}
              />
            ) : (
              <TaskList
                tasks={tasks.filter((tasks) => tasks.status === "not-started")}
              />
            )}
          </div>
        </div>
        <div className="categories">
          {<h2>IN PROGRESS</h2>}
          <div className="containerbackground1">
            There is nothing so fatal as half finishes tasks
          </div>

          {isPending && <div>Loading</div>}
          <div className="list-container">
            {filter ? (
              <TaskList
                tasks={tasks.filter(
                  (tasks) =>
                    tasks.title.toLowerCase().includes(filter.toLowerCase()) &&
                    tasks.status === "in-progress"
                )}
              />
            ) : (
              <TaskList
                tasks={tasks.filter((tasks) => tasks.status === "in-progress")}
              />
            )}
          </div>
        </div>
        <div className="categories">
          {<h2>COMPLETED</h2>}
          <div className="containerbackground2">
            It is not done, until it's done
          </div>

          {isPending && <div>Loading</div>}
          <div className="list-container">
            {filter ? (
              <TaskList
                tasks={tasks.filter(
                  (tasks) =>
                    tasks.title.toLowerCase().includes(filter.toLowerCase()) &&
                    tasks.status === "completed"
                )}
              />
            ) : (
              <TaskList
                tasks={tasks.filter((tasks) => tasks.status === "completed")}
              />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No tasks</div>;
  }
};

export default React.memo(Home);
