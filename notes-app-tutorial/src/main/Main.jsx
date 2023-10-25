// Import the ReactMarkdown component from the "react-markdown" library.
import ReactMarkdown from "react-markdown";

// Define a functional component named "Main" that takes two props, "activeNote" and "onUpdateNote."
const Main = ({ activeNote, onUpdateNote }) => {
  // Define a function "onEditField" that takes two arguments: "field" and "value."
  const onEditField = (field, value) => {
    // Call the "onUpdateNote" function with an updated note object.
    onUpdateNote({
      ...activeNote,             // Spread the properties of the current "activeNote."
      [field]: value,            // Update the specified field with the new "value."
      lastModified: Date.now(), // Update the "lastModified" property with the current timestamp.
    });
  };

  // If there is no "activeNote" provided, render a message indicating there's no active note.
  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  // Render the main application UI.
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {/* Input field for editing the note title */}
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}  // Display the title from the "activeNote" prop.
          onChange={(e) => onEditField("title", e.target.value)} // Call "onEditField" when the input value changes.
          autoFocus  // Automatically focus on this input when the component renders.
        />
        {/* Textarea for editing the note body */}
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}  // Display the note body from the "activeNote" prop.
          onChange={(e) => onEditField("body", e.target.value)} // Call "onEditField" when the textarea value changes.
        />
      </div>
      <div className="app-main-note-preview">
        {/* Display the note title in an "h1" element */}
        <h1 className="preview-title">{activeNote.title}</h1>
        
        {/* Render the markdown preview of the note body using ReactMarkdown */}
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

// Export the "Main" component as the default export of this module.
export default Main;
