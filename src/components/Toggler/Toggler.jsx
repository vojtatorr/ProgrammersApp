import "./Toggler.css";

function Toggler({ onChoose }) {
  const handleClick = (e) => {
    onChoose(e.target.name);
  };

  return (
    <div className="page-toggler">
      <button
        className="toggler-btn"
        name="list-of-progs"
        onClick={handleClick}
      >
        List of programmers
      </button>
      <button className="toggler-btn" name="task-planner" onClick={handleClick}>
        Form for planning tasks
      </button>
    </div>
  );
}
export default Toggler;
