import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import useFetch from "./useFetch";
import { useEffect, useContext } from "react";
import { ImCross } from "react-icons/im";
import { IconContext } from "react-icons";
import { FilterContext } from "./Planner";

let flag = 1;
const TaskDetails = () => {
  const { query, isActive, setFunctionality } = useContext(FilterContext);
  const { id } = useParams();
  const { data, isPending, error } = useFetch();
  console.log(data && data);
  let taskIndex = "-1";
  let taskId = "";
  let a = data && Object.values(data);
  let bb;
  useEffect(() => {
    setFunctionality(false);
  });
  if (data) {
    for (let i = 0; i < a.length; i++) {
      if (a[i].id == id) {
        taskIndex = i;
        taskId = a[i].id;
      }
    }
  }
  const navigate = useNavigate();
  const handleDelete = () => {
    handleClick();
  };
  const handleClick = () => {
    flag = 0;

    axios.get("/db.json").then((response) => {
      console.log("success");
      bb = response.data;
      let as = Object.values(bb);
      const arr = as.filter((item) => {
        return item.id !== taskId;
      });

      const url = "http://localhost:5000/write";
      console.log(arr);

      axios.post(url, arr);
      navigate("/");
    });
  };
  if (taskIndex != -1) {
    if (flag) {
      console.log(data && a);
      console.log(data && a[taskIndex]);
      console.log(data && taskIndex);
      if (data && a[taskIndex].title) {
        return (
          <div className="task-details">
            {isPending && <div>Loading</div>}
            {error && <div>{error}</div>}
            {data && (
              <div className="task-detail">
                <IconContext.Provider value={{ className: "top-react-icons" }}>
                  <div className="close-button">
                    <ImCross
                      onClick={() => {
                        navigate("/");
                      }}
                    />
                  </div>
                </IconContext.Provider>
                <div className="task-title">{a[taskIndex].title}</div>
                <div className="task-info">
                  <div>DESCRIPTION: </div>
                  <div className="task-description">{a[taskIndex].body}</div>
                </div>
                <div className="task-info">
                  <div>START DATE:</div>
                  <div>{a[taskIndex].startDate}</div>
                </div>
                <div className="task-info">
                  <div>END DATE:</div>
                  <div>{a[taskIndex].endDate}</div>
                </div>
                {a[taskIndex].actualEndDate && (
                  <div className="task-info">
                    <div>ACTUAL END DATE: </div>
                    <div>{a[taskIndex].actualEndDate}</div>
                  </div>
                )}
                <button onClick={handleDelete}>delete</button>
              </div>
            )}
          </div>
        );
      } else {
        <div>No task found</div>;
      }
    }
  } else {
    return (
      <div className="not-found">
        <div>Task Not found </div>
        <div
          className="go-back"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back
        </div>
      </div>
    );
  }
};

export default React.memo(TaskDetails);
