/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { EditActivity } from "./";
import { removeActivityFromRoutine } from "../api";
// this is part of single routine component
const SingleActivity = ({ activity, token }) => {
  const [clickedEdit, setClickedEdit] = useState(false);
  const [editedActivity, setEditedActivity] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDuration, setEditedDuration] = useState(null);
  const [editedCount, setEditedCount] = useState(null);
  const [removed, setRemoved] = useState(false);
  return (
    <li>
      <span>
        {editedActivity ? (
          <>
            <h5>{editedName.length > 0 ? editedName : activity.name}</h5>
            <p>
              {editedDescription.length > 0
                ? editedDescription
                : activity.description}
            </p>
            <small>
              Duration:{" "}
              {editedDuration !== null ? editedDuration : activity.duration} |
              Count: {editedCount !== null ? editedCount : activity.count}
            </small>
          </>
        ) : (
          <>
            <h5>{activity.name}</h5>
            <p>{activity.description}</p>
            <small>
              Duration: {activity.duration} | Count: {activity.count}
            </small>
          </>
        )}
      </span>
      <br />
      <span>
        <button
          onClick={(e) => {
            e.preventDefault();
            setClickedEdit(true);
          }}
        >
          Edit
        </button>
        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              // prompt user to make sure they want to remove activity
              let text = "Are you sure you want to remove this activity?";
              if (confirm(text)) {
                let response = await removeActivityFromRoutine(
                  token,
                  activity.routineActivityId
                );
                if (response.success) {
                  setRemoved(true);
                  alert("Activity successfully removed!");
                } else {
                  alert("There was a problem removing this activity!");
                }
              }
            } catch (error) {
              throw error;
            }
          }}
        >
          Remove
        </button>
      </span>
      <span>
        {clickedEdit ? (
          <span className="myroutine-editform">
            <EditActivity
              token={token}
              activityId={activity.id}
              routineActivityId={activity.routineActivityId}
              setEditedActivity={setEditedActivity}
              setEditedName={setEditedName}
              setEditedDescription={setEditedDescription}
              setEditedDuration={setEditedDuration}
              setEditedCount={setEditedCount}
              setClickedEdit={setClickedEdit}
            />
          </span>
        ) : null}
      </span>
      <span>
        {editedActivity ? <h4>Activity Successfully Edited!</h4> : null}
      </span>
      <span>{removed ? <h4>Activity Successfully Removed!</h4> : null}</span>
    </li>
  );
};

export default SingleActivity;