/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { EditRoutine, SingleActivity, AddActivity } from "./";
import { deleteRoutine } from "../api";

// Shown within the Routines component and then in Main
const SingleRoutine = ({
  routine,
  token,
  activities,
  myRoutines,
  setMyRoutines,
}) => {
  const [clickedEditRoutine, setClickedEditRoutine] = useState(false);
  const [edited, setEdited] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedGoal, setEditedGoal] = useState("");
  const [editedPublic, setEditedPublic] = useState(false);
  const [clickedAddActivity, setClickedAddActivity] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div className="single-routine">
      {edited ? (
        <>
          <h2>Routine: {editedName.length > 0 ? editedName : routine.name}</h2>
          <h3>Public: {editedPublic ? "Yes" : "No"}</h3>
          <p>{editedGoal.length > 0 ? editedGoal : routine.goal}</p>
        </>
      ) : (
        <>
          <h2>Routine: {routine.name}</h2>
          <h3>Public: {routine.isPublic ? "Yes" : "No"}</h3>
          <p>{routine.goal}</p>
        </>
      )}
      <span className="button-container">
        {!clickedEditRoutine ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setClickedEditRoutine(true);
            }}
          >
            Edit Routine
          </button>
        ) : null}
        <button
          onClick={async (e) => {
            e.preventDefault();
            let text = "Are you sure you want to delete this routine?";
            if (confirm(text)) {
              let response = await deleteRoutine(token, routine.id);
              if (response.success) {
                const filteredRoutines = myRoutines.filter((pastRoutine) => {
                  return pastRoutine.id !== routine.id;
                });
                setMyRoutines(filteredRoutines);
                alert("Routine successfully deleted!");
              } else {
                alert("There was a problem deleting your routine!");
              }
            }
          }}
        >
          Delete Routine
        </button>
      </span>
      <span>
        {clickedEditRoutine ? (
          <span className="myroutine-editform">
            <EditRoutine
              routineId={routine.id}
              setClickedEditRoutine={setClickedEditRoutine}
              setEdited={setEdited}
              token={token}
              setEditedName={setEditedName}
              setEditedGoal={setEditedGoal}
              setEditedPublic={setEditedPublic}
            />
          </span>
        ) : null}
      </span>
      <span>{edited ? <h4>Routine Successfully Edited!</h4> : null}</span>

      <h4>Activities:</h4>
      <button
        onClick={(e) => {
          e.preventDefault();
          setClickedAddActivity(true);
        }}
      >
        Add Activity
      </button>
      <span>
        {added ? <h4>Activity Successfully Added to Routine!</h4> : null}
      </span>
      <span>
        {clickedAddActivity ? (
          <span className="myroutine-editform">
            <AddActivity
              activities={activities}
              token={token}
              routineId={routine.id}
              setClickedAddActivity={setClickedAddActivity}
              setAdded={setAdded}
            />
          </span>
        ) : null}
      </span>
      <ol>
        {routine.activities.map((activity, j) => {
          return (
            <SingleActivity
              key={`myroutine-activity-${j}`}
              token={token}
              activity={activity}
            />
          );
        })}
      </ol>
    </div>
  );
};

export default SingleRoutine;