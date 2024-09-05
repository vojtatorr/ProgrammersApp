import "./ProgForm.css";

function ProgForm({ data, valid, onChange, onAdd }) {
  return (
    <div className="prog-form">
      <input
        type="text"
        placeholder="jméno programátora"
        name="name"
        onChange={onChange}
        value={data.name}
      />

      <div className="level-options">
        <label>
          <input
            type="radio"
            defaultChecked
            name="level"
            value="Junior"
            checked={data.level === "Junior"}
            onChange={onChange}
          />
          Junior
        </label>
        <label>
          <input
            type="radio"
            name="level"
            value="Senior"
            checked={data.level === "Senior"}
            onChange={onChange}
          />
          Senior
        </label>
      </div>

      <button disabled={!valid} onClick={onAdd}>
        Přidat
      </button>
    </div>
  );
}

export default ProgForm;
