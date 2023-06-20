import React from "react";
import { useLocation } from "react-router-dom";
import "./CharCreate.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { database } from "../services/Firebase";

const CharCreate = () => {
  // Routing
  const location = useLocation();
  const { username } = location.state;

  const [roomSelected, setRoomSelected] = useState(false);
  const [hasRoom, setHasRoom] = useState(false);
  const [officeId, setOfficeId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the desired action with the entered office ID
    console.log("Submitted Office ID:", officeId);
    // Reset the input field
    setOfficeId(officeId);

    const snapshot = await get(ref(database, `OFFICES/${officeId}/users`));
    const fetchedData = snapshot.val();
    console.log(fetchedData);

    if (username in fetchedData) {
      setHasRoom(true);
      setRoomSelected(true);
      navigate("/Rooms", { state: { username, officeId } });
    } else {
      setRoomSelected(true);
      setHasRoom(false);
      console.log("Reg");
    }

    // if (fetchedData.password.toString() == password) {
    //   console.log("Equals")
    //   navigate('/charcreate', { state: { username } });

    // }
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log("Selected option:", selectedOption);

    set(ref(database, `OFFICES/${officeId}/users/${username}`), {
      style: selectedOption,
    });

    navigate("/Rooms", { state: { username, officeId } });
  };

  let selectedContent;
  if (selectedOption === "option1") {
    selectedContent = <div>Option 1 content</div>;
  } else if (selectedOption === "option2") {
    selectedContent = <div>Option 2 content</div>;
  } else if (selectedOption === "option3") {
    selectedContent = <div>Option 3 content</div>;
  }

  return (
    // JSX for the CharCreate component
    <div className="CharCreate">
      <h1>Welcome, {username}!</h1>

      {roomSelected == false && (
        <form onSubmit={handleSubmit}>
          <label>
            Insert Office ID:
            <input
              type="text"
              value={officeId}
              onChange={(e) => setOfficeId(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

      {roomSelected == true && hasRoom == false && (
        <form onSubmit={handleSubmit2}>
          <label>
            Select an option:
            <select value={selectedOption} onChange={handleSelectChange}>
              <option value="">Select</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CharCreate;
