import { useEffect, useState } from "react";
import uuid from "react-uuid"; // A library for generating unique IDs.
import "./App.css"; 
import Main from "./main/Main"; 
import Sidebar from "./sidebar/Sidebar"; 

function App() {
  // Initialize the "notes" state using the "useState" hook. If there are notes in 
  //localStorage, parse and use them; otherwise, initialize it as an empty array.
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  // Initialize the "activeNote" state as "false" to represent no active note.
  const [activeNote, setActiveNote] = useState(false);

  // Use the "useEffect" hook to save the "notes" state to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Function to add a new note.
  const onAddNote = () => {
    // Create a new note object with a unique ID, default title, empty body, and current timestamp.
    const newNote = {
      id: uuid(), // Generate a unique ID.
      title: "Untitled Note", // Default title.
      body: "", // Empty body.
      lastModified: Date.now(), // Current timestamp.
    };

    // Update the "notes" state by adding the new note to the beginning of the array.
    setNotes([newNote, ...notes]);

    // Set the newly created note as the active note.
    setActiveNote(newNote.id);
  };

  // Function to delete a note based on its ID.
  const onDeleteNote = (noteId) => {
    // Filter out the note with the specified ID and update the "notes" state.
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  // Function to update a note's content.
  const onUpdateNote = (updatedNote) => {
    // Map over the existing notes array and replace the note with the same ID as the updated note with the updated version.
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    // Update the "notes" state with the modified array of notes.
    setNotes(updatedNotesArr);
  };

  // Function to get the currently active note.
  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  // Render the main App UI.
  return (
    <div className="App">
      {/* Render the Sidebar component with relevant props */}
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      {/* Render the Main component with relevant props */}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

// Export the App component as the default export of this module.
export default App;
