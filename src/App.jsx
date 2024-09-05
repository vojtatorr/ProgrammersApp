import { useState } from "react";
import rawData from "./progsData.json";
import PageContainer from "./components/PageContainer/PageContainer";
import ProgList from "./components/ProgList/ProgList";
import ProgForm from "./components/ProgForm/ProgForm";
import Toggler from "./components/Toggler/Toggler";
import TaskPlanner from "./components/TaskPlanner/TaskPlanner";

function App() {
  const [listOfProgs, setListOfProgs] = useState(rawData.progs);
  const [newProg, setNewProg] = useState({
    id:
      listOfProgs.length > 0
        ? Math.max(...listOfProgs.map((prog) => prog.id)) + 1
        : 1,
    name: "",
    level: "",
  });

  const [valid, setValid] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const validateData = (prog) => {
    setValid(prog.name?.trim() !== "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProg((prevProg) => ({
      ...prevProg,
      [name]: value,
    }));
    validateData({ ...newProg, [name]: value });
  };

  const handleAdd = () => {
    if (valid) {
      setListOfProgs((prevList) => [...prevList, newProg]);
      setNewProg({
        id: newProg.id + 1,
        name: "",
        level: "",
      });
      validateData({
        id: newProg.id + 1,
        name: "",
        level: "",
      });
    }
  };

  const handleDelete = (idToDel) => {
    setListOfProgs((prevList) =>
      prevList.filter((prog) => prog.id !== idToDel)
    );
  };

  const handleChoose = (name) => {
    setActiveTab(name === "list-of-progs" ? 1 : 2);
  };

  return (
    <PageContainer>
      <h1>Your app for handling projects</h1>
      <h2>Toggle view</h2>
      <Toggler onChoose={handleChoose} active={activeTab} />
      {activeTab === 1 && (
        <>
          <h2>Your team</h2>
          <ProgList data={listOfProgs} onDelete={handleDelete} />
          <ProgForm
            valid={valid}
            onChange={handleChange}
            onAdd={handleAdd}
            data={newProg}
          />
        </>
      )}
      {activeTab === 2 && (
        <>
          <h2>Your task</h2>
          <TaskPlanner progs={listOfProgs} />
        </>
      )}
    </PageContainer>
  );
}

export default App;
