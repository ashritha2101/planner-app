import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import TaskDetails from "./TaskDetails";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { IconContext } from "react-icons";
export const FilterContext = createContext();

function Planner() {
  const [functionality, setFunctionality] = useState(true);
  const [query, setQuery] = useState("");
  const inputRef = React.createRef();
  const arrowUp = <AiOutlineArrowUp />;
  const arrowDown = <AiOutlineArrowDown />;
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {});
  console.log(isActive);
  return (
    <div className="App">
      {functionality ? (
        <div>
          <div className="filter-task">
            <p>Search:</p>
            <input
              value={query}
              type="text"
              ref={inputRef}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div
            className="sort-task"
            onClick={() => {
              setActive(!isActive);
            }}
          >
            <div>Sort Tasks</div>
            <div className="arrow" id="arrow">
              <IconContext.Provider value={{ color: "white" }}>
                {isActive ? arrowUp : arrowDown}
              </IconContext.Provider>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <FilterContext.Provider value={{ query, isActive, setFunctionality }}>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<TaskDetails />} />
          </Routes>
        </div>
      </FilterContext.Provider>
    </div>
  );
}

export default Planner;
