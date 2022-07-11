import React, { useState } from "react";
import { updateUserRoutine } from "../api";
// on the my routines page
const EditRoutine = ({
  routineId,
  setClickedEditRoutine,
  setEdited,
  token,
  setEditedName,
  setEditedGoal,
  setEditedPublic,
}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await updateUserRoutine(token, routineId, {
          name,
          goal,
          isPublic,
        });
        setEditedName(name);
        setEditedGoal(goal);
        setEditedPublic(isPublic);
        setEdited(true);
        setClickedEditRoutine(false);
      }}
    >
      <span>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
        />
      </span>
      <span>
        <label>Goal:</label>
        <input
          type="text"
          placeholder="Goal"
          value={goal}
          onChange={(e) => {
            e.preventDefault();
            setGoal(e.target.value);
          }}
        />
      </span>
      <span>
        <label>Public:</label>
        <input
          type="checkbox"
          onChange={() => {
            setIsPublic(!isPublic);
          }}
        />
      </span>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditRoutine;