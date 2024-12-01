import React, { useState } from "react";

function StreamList() {
  const [userInput, setUserInput] = useState("");
  const [events, setEvents] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault(); 

    
    if (userInput.trim() === "") {
      alert("Please enter a valid event!");
      return;
    }

    
    const newEvent = {
      id: Date.now(), 
      name: userInput,
      completed: false,
    };
    setEvents([...events, newEvent]);
    setUserInput(""); 
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleEdit = (id) => {
    const updatedName = prompt("Edit event name:");
    if (updatedName) {
      setEvents(events.map((event) =>
        event.id === id ? { ...event, name: updatedName } : event
      ));
    }
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleComplete = (id) => {
    setEvents(events.map((event) =>
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  return (
    <div className="stream-list">
      <h1>StreamList</h1>

      {/* Form for input */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter an event"
        />
        <button type="submit">
          <i className="fa fa-plus"></i> Add Event
        </button>
      </form>

      {/* List of events */}
      <div className="event-list">
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              style={{ textDecoration: event.completed ? "line-through" : "none" }}
            >
              {event.name}
              <button onClick={() => handleEdit(event.id)}>Edit</button>
              <button onClick={() => handleComplete(event.id)}>
                {event.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StreamList;
