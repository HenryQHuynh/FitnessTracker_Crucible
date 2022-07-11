import React, { useState } from "react";
import { updateActivity, updateRoutineActivity } from "../api";
// on the my routines page

const EditActivity = ({
  token,
  activityId,
  routineActivityId,
  setEditedActivity,
  setEditedName,
  setEditedDescription,
  setEditedDuration,
  setEditedCount,
  setClickedEdit,
}) => {
  // information for the form, but also used to set edited information on the single activity component
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(null);
  const [count, setCount] = useState(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          // updates the actviity
          await updateActivity(token, activityId, {
            name,
            description,
          });
          // updates the routine activity
          await updateRoutineActivity(token, routineActivityId, {
            count,
            duration,
          });
          setEditedName(name);
          setEditedDescription(description);
          setEditedDuration(duration);
          setEditedCount(count);
          setEditedActivity(true);
          setClickedEdit(false);
        } catch (error) {
          throw error;
        }
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
        <label>Description:</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            e.preventDefault();
            setDescription(e.target.value);
          }}
        />
      </span>
      <span>
        <label>Duration:</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => {
            e.preventDefault();
            setDuration(e.target.value);
          }}
        />
      </span>
      <span>
        <label>Count:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => {
            e.preventDefault();
            setCount(e.target.value);
          }}
        />
      </span>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditActivity;