import React, { useState } from "react";
import { addActivityToRoutine } from "../api";
// component to add an activity on the my routines page.
const AddActivity = ({
  activities,
  token,
  routineId,
  setClickedAddActivity,
  setAdded,
}) => {
  const [activityId, setActivityId] = useState(activities[0].id);
  const [duration, setDuration] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await addActivityToRoutine(token, routineId, {
          activityId,
          count,
          duration,
        });
        setClickedAddActivity(false);
        setAdded(true);
      }}
    >
      {/* Its a drop down select of activity names */}
      <select
        name="activity"
        id="select-activity"
        value={activityId}
        onChange={(e) => {
          setActivityId(e.target.value);
        }}
      >
        {activities.map((each, i) => {
          return (
            <option key={i} value={each.id}>
              {each.name}
            </option>
          );
        })}
      </select>
      <span>
        <label>Duration: </label>
        <input
          type="number"
          placeholder="0"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
          }}
        />
      </span>
      <span>
        <label>Count: </label>
        <input
          type="number"
          placeholder="0"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
      </span>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddActivity;