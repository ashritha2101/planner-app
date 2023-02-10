import { useEffect, useState, useContext } from "react";
import React from "react";
import { FilterContext } from "./Planner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { query, isActive, setFunctionality } = useContext(FilterContext);
  const presentYear = new Date().getFullYear();
  let maxDate = new Date(`${presentYear}-12-31`);
  console.log(maxDate);
  useEffect(() => {
    setFunctionality(false);
  });
  function myFunction() {
    window.addEventListener("click", () => {
      document.getElementById("task-title").innerHTML = "";
      document.getElementById("task-description").innerHTML = "";
    });
    if (title.replace(/\s/g, "").length >= 24) {
      document.getElementById("task-title").innerHTML =
        "Max characters Exceeded";
    } else {
      document.getElementById("task-title").innerHTML = "";
    }
  }
  function myFunction1() {
    window.addEventListener("click", () => {
      document.getElementById("task-title").innerHTML = "";
      document.getElementById("task-description").innerHTML = "";
    });
    if (body.replace(/\s/g, "").length >= 199) {
      document.getElementById("task-description").innerHTML =
        "Max characters Exceeded";
    } else {
      document.getElementById("task-description").innerHTML = "";
    }
  }
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    window.addEventListener("click", () => {
      document.getElementById("task-title").innerHTML = "";
      document.getElementById("task-description").innerHTML = "";
    });
    if (!title.replace(/\s/g, "").length) {
      document.getElementById("task-title").innerHTML = "Enter valid Title";
    }

    if (!body.replace(/\s/g, "").length) {
      document.getElementById("task-description").innerHTML =
        "Enter valid Description";
    } else if (
      title.replace(/\s/g, "").length &&
      body.replace(/\s/g, "").length
    ) {
      axios.get("/db.json").then((response) => {
        console.log("success");
        let bb = response.data;
        let as = Object.values(bb);
        let taskId = as[as.length - 1].id;
        const task = {
          title: title,
          body: body,
          status: "not-started",
          startDate: startDate,
          endDate: endDate,
          actualEndDate: "",
          id: taskId + 1,
          background: "white",
        };
        as.push(task);
        const arr = as;
        const url = "http://localhost:5000/write";
        console.log(arr);
        axios.post(url, arr);
        navigate("/");
      });
    }
  };

  return (
    <div className="create">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Task Title:</label>
        <input
          type="text"
          required
          value={title}
          onKeyDown={myFunction}
          maxLength={25}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div id="task-title"></div>
        <label className="task-des">Task Description:</label>
        <textarea
          required
          name="task-description"
          onKeyDown={myFunction1}
          maxLength={200}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div id="task-description"></div>
        <label className="task-startdate">Task Start Date:</label>
        <input
          type="date"
          id="start-date"
          required
          maxLength={8}
          name="start-date"
          value={startDate}
          min={`${presentYear}-01-01`}
          max={`${presentYear}-12-31`}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        ></input>
        <label>Task End Date:</label>
        <input
          type="date"
          required
          id="end-date"
          name="end-date"
          value={endDate}
          min={startDate}
          max={`${presentYear}-12-31`}
          onChange={(e) => setEndDate(e.target.value)}
        ></input>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};
export default React.memo(Create);
