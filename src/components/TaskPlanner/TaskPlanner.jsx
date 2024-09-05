import { useEffect, useState } from "react";
import "./TaskPlanner.css";

function TaskPlanner({ progs }) {
  // Calculate the number of junior and senior programmers from progs
  const numberOfJuniors = progs.filter(
    (prog) => prog.level.toLowerCase() === "junior"
  ).length;
  const numberOfSeniors = progs.filter(
    (prog) => prog.level.toLowerCase() === "senior"
  ).length;

  // Productivity rates
  const juniorProductivity = 100; // lines per day
  const seniorProductivity = 200; // lines per day

  const [tempTask, setTempTask] = useState({
    numlines: "",
    numdays: "",
  });

  const [disable, setDisable] = useState(true);

  const handleTask = (e) => {
    const source = e.target.name;
    const value = e.target.value;
    setTempTask((prevState) => ({
      ...prevState,
      [source]: value,
    }));
  };

  useEffect(() => {
    const numlines = parseInt(tempTask.numlines, 10) || 0;
    const numdays = parseInt(tempTask.numdays, 10) || 0;

    // Calculate total productivity
    const totalProductivity =
      (numberOfJuniors * juniorProductivity +
        numberOfSeniors * seniorProductivity) *
      numdays;

    // Disable button if total productivity is < numlines
    const isDisabled = totalProductivity < numlines;
    setDisable(isDisabled);
  }, [tempTask, numberOfJuniors, numberOfSeniors]);

  const handleClick = () => {
    // Perform any additional logic if needed on button click
    console.log("Button clicked!");
  };

  return (
    <div className="task-planner-container">
      <div className="input-group">
        <label>
          Lines of code
          <input
            type="number"
            placeholder="Number of lines of code"
            name="numlines"
            onChange={handleTask}
            value={tempTask.numlines}
          />
        </label>

        <label>
          Time limit [days]
          <input
            type="number"
            placeholder="Time limit"
            name="numdays"
            onChange={handleTask}
            value={tempTask.numdays}
          />
        </label>

        <button
          disabled={disable}
          onClick={handleClick}
          className={disable ? "button-disabled" : "button-enabled"}
        >
          Do it!
        </button>
      </div>
    </div>
  );
}

export default TaskPlanner;
