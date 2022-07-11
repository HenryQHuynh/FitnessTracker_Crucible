import React, { useState, useEffect } from "react";
import { getUserRoutines, getAllActivities } from "../api";
import { SingleRoutine, CreateRoutine } from "./";

const MyRoutines = ({ isLoggedIn, token, user }) => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [clickedAdd, setClickedAdd] = useState(false);
  const [added, setAdded] = useState(false);

  // set the my routines array with the users' routines, even if changed after the page loads
  useEffect(() => {
    const fetchRoutines = async () => {
      const userRoutines = await getUserRoutines(token, user.username);
      setMyRoutines(userRoutines);
    };
    fetchRoutines();
  }, [setMyRoutines, token, user.username]);
  // sets the activities for the add activities form
  useEffect(() => {
    const fetchActivities = async () => {
      const allActivities = await getAllActivities();
      setActivities(allActivities);
    };
    fetchActivities();
  }, []);

  return (
    <div className="my-routines-page">
      {isLoggedIn ? (
        <>
          <h2>My Routines</h2>
          {added ? <p>Successfully Added Routine!</p> : null}
          {clickedAdd ? (
            <span>
              <CreateRoutine
                token={token}
                setClickedAdd={setClickedAdd}
                setAdded={setAdded}
                myRoutines={myRoutines}
                setMyRoutines={setMyRoutines}
              />
            </span>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setClickedAdd(true);
              }}
            >
              Add New Routine
            </button>
          )}

          <br />
          {myRoutines.map((routine, i) => {
            return (
              <SingleRoutine
                key={`myroutine-${i}`}
                token={token}
                routine={routine}
                activities={activities}
                myRoutines={myRoutines}
                setMyRoutines={setMyRoutines}
              />
            );
          })}
        </>
      ) : (
        <h2>Please log in to view your routines!</h2>
      )}
    </div>
  );
};

export default MyRoutines;