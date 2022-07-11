import React, { useState, useEffect } from "react";
import { getAllActivities } from "../api";
import { CreateActivity } from "./";
import "../css/Activities.css";

// Shown in Main.jsx
const Activities = ({ isLoggedIn, token }) => {
  const [activities, setActivities] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [created, setCreated] = useState(false);

  // it resets the activities array whenever setActivities is called
  useEffect(() => {
    const fetchActivities = async () => {
      const allActivities = await getAllActivities();
      setActivities(allActivities);
    };
    fetchActivities();
  }, [setActivities]);

  return (
    <div className="activities-page">
      <h2>Activities</h2>
      {isLoggedIn ? (
        <>
          {clicked ? (
            <span className="activity-form">
              {/* Component is a form to create a new activity */}
              <CreateActivity
                token={token}
                setClicked={setClicked}
                setCreated={setCreated}
                activities={activities}
                setActivities={setActivities}
              />
            </span>
          ) : (
            <span className="activity-form">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setClicked(true);
                }}
              >
                Create New Activity
              </button>
              <span>
                {/* If an activity is created, display success notification */}
                {created ? <h4>Activity Successfully Created!</h4> : null}
              </span>
            </span>
          )}
        </>
      ) : (
        <p className="activity-login">Log in to create a new activity!</p>
      )}
      <div className="activities-container">
        {/* maps over the actvities array and creates an activity card for each activity object */}
        {activities.map((activity, i) => {
          return (
            <span className="single-activity" key={`activities[${i}]`}>
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Activities;