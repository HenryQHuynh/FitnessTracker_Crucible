import React, { useState } from "react";
import { createNewActivity } from "../api";
// creates a new activity on the activities page
const CreateActivity = ({
  token,
  setClicked,
  setCreated,
  activities,
  setActivities,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const response = await createNewActivity(token, {
            name,
            description,
          });
          if (response.message) {
            setMessage(response.message);
          } else {
            const newArr = [response, ...activities];
            setMessage(null);
            setActivities(newArr);
            setCreated(true);
            setClicked(false);
          }
        } catch (error) {
          throw error;
        }
      }}
    >
      <label>Name: </label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>Description: </label>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
      {message !== null ? <p>{message}</p> : null}
    </form>
  );
};

export default CreateActivity;