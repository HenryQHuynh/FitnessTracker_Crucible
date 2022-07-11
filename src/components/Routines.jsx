import React, { useState, useEffect } from "react";
import { getPublicRoutines } from "../api";

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  // setting the routines array after the fetch is completed
  useEffect(() => {
    const getRoutines = async () => {
      const routinesArray = await getPublicRoutines();
      setRoutines(routinesArray);
    };
    getRoutines();
  }, []);

  return (
    <div className="routines-page">
      {/* mapping over routines array to produce single routine cards */}
      {routines.map((routine, i) => {
        return (
          <div key={`publicRoutine-${i}`} className="single-routine">
            <h2>Routine: <u>{routine.name}</u></h2>
            <h3>Creator: <u>{routine.creatorName}</u></h3>
            <p>{routine.goal}</p>
            <h4>Activities:</h4>
            <ol>
              {/* mapping over activities array within the routine and producing listed activities */}
              {routine.activities.map((activity, j) => {
                return (
                  <li key={`routine-${i}-activity-${j}`}>
                    <h5>{activity.name}</h5>
                    <p>{activity.description}</p>
                    <small>
                      Duration: {activity.duration} | Count: {activity.count}
                    </small>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
};

export default Routines;