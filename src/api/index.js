const API_URL = "https://fitnesstrac-kr.herokuapp.com/api/";

//Function creates a new user

export async function registerUser(username, password) {
  try {
    // Post request to API to add user
    const response = await fetch(`${API_URL}users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Sending username and password object in the req.body
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // Parsing the returned json object
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// This function verfies username and password
export async function loginUser(username, password) {
  try {
    // Post request to login route
    const response = await fetch(`${API_URL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

// Function to get all publi routines
export async function getPublicRoutines() {
  try {
    // Fetch request to get all public routines
    const response = await fetch(`${API_URL}routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// Gets a user object using the token on file
export async function getUser(token) {
  try {
    // a fetch request with authorization header to get back the user object
    const response = await fetch(`${API_URL}users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// a function to get all the user's routines
export async function getUserRoutines(token, username) {
  try {
    // fetch with the username in the url and authorization token to get all users' routines
    const responseRoutines = await fetch(
      `${API_URL}users/${username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = responseRoutines.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// This function updates a routine if its owned by the user
export async function updateUserRoutine(
  token,
  routineId,
  { name, goal, isPublic }
) {
  // Establish update object with supplied information
  let updateObj = {};
  if (name) {
    updateObj.name = name;
  }
  if (goal) {
    updateObj.goal = goal;
  }
  if (typeof isPublic === "boolean") {
    updateObj.isPublic = isPublic;
  }
  // If the update object is empty end the function early
  if (Object.keys(updateObj).length === 0) {
    return;
  }
  try {
    // Patch request with the update information
    const response = await fetch(`${API_URL}routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateObj),
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// function to delete a routine if the user is the creator
export async function deleteRoutine(token, routineId) {
  try {
    // a delete request to the server for the specific routine ID
    const response = await fetch(`${API_URL}routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// function to get all activities
export async function getAllActivities() {
  try {
    // a get request for all activities
    const response = await fetch(`${API_URL}activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// this function adds an activity to a routine
export async function addActivityToRoutine(
  token,
  routineId,
  { activityId, count, duration }
) {
  try {
    // post request using the routine id in the URL and the routine activity object in the body
    const response = await fetch(`${API_URL}routines/${routineId}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ activityId, count, duration }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// function to update and activity
export async function updateActivity(token, activityId, { name, description }) {
  // build update object if the information is supplied.
  let updateObj = {};
  if (name) {
    updateObj.name = name;
  }
  if (description) {
    updateObj.description = description;
  }
  // if the update object is empty, leave the function early.
  if (Object.keys(updateObj).length === 0) {
    return;
  }
  try {
    // a patch request to that specific activity ID if the user is logged in.
    const response = await fetch(`${API_URL}activities/${activityId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateObj),
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// function to update the count or duration of an activity attached to a routine.
export async function updateRoutineActivity(
  token,
  routineActivityId,
  { count, duration }
) {
  // build the update object with the supplied information
  let updateObj = {};
  if (count !== null) {
    updateObj.count = count;
  }
  if (duration !== null) {
    updateObj.duration = duration;
  }
  if (Object.keys(updateObj).length === 0) {
    return;
  }
  try {
    // a patch request for a specific routine actvity id if the user is logged in
    const response = await fetch(
      `${API_URL}routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateObj),
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// function to remove activity from a routine/deleted routine activity from table.
export async function removeActivityFromRoutine(token, routineActivityId) {
  try {
    // delete request for a specific routine activity ID if the user is logged in and if the user is the creator of the routine
    const response = await fetch(
      `${API_URL}routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// function for creating a routine
export async function postRoutine(token, { name, goal, isPublic }) {
  let routineObj = { name, goal };
  // isPublic is optional, so check if its added as true or false. If not, don't add it.
  if (typeof isPublic === "boolean") {
    routineObj.isPublic = isPublic;
  }
  try {
    // post request to create new routine if the user is logged in
    const response = await fetch(`${API_URL}routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(routineObj),
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// function to create a new activity
export async function createNewActivity(token, { name, description }) {
  try {
    // post request to create a new activity if user is logged in
    const response = await fetch(`${API_URL}activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}