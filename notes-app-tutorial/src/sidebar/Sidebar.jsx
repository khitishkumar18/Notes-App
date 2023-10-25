// Define a functional component named "Sidebar" that takes several props: "notes," "onAddNote," "onDeleteNote," "activeNote," and "setActiveNote."
const Sidebar = ({
  notes,          // An array of notes to display in the sidebar.
  onAddNote,      // A function to add a new note.
  onDeleteNote,   // A function to delete a note.
  activeNote,     // The currently active note.
  setActiveNote,  // A function to set the active note when a note is clicked.
}) => {
  // Sort the "notes" array in descending order based on the "lastModified" property.
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  // Render the sidebar UI.
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        {/* Button to add a new note, triggers the "onAddNote" function when clicked */}
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {/* Map through the sorted notes array and render each note */}
        {sortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)} // Set the active note when this note is clicked.
          >
            <div className="sidebar-note-title">
              {/* Display the note title in bold */}
              <strong>{title}</strong>
              {/* Button to delete the note, triggers the "onDeleteNote" function when clicked */}
              <button onClick={(e) => onDeleteNote(id)}>Delete</button>
            </div>

            {/* Display a preview of the note body, truncated to the first 100 characters */}
            <p>{body && body.substr(0, 100) + "..."}</p>

            {/* Display the last modification date and time in a specific format */}
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the "Sidebar" component as the default export of this module.
export default Sidebar;
