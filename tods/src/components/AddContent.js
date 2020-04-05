import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddContent = ({ todo_id }) => {
  const [newContent, setNewContent] = useState("");
  const { add_content } = useContext(GlobalContext);

  const submitContent = e => {
    e.preventDefault();
    const newcontent = {
      content_text: newContent
    };

    add_content(newcontent, todo_id);
    setNewContent("");
  };

  return (
    <div className="form-control">
      <form onSubmit={submitContent}>
        <label htmlFor="content" className="pretty">
          Add Content <br />
        </label>
        <input
          type="text"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
          placeholder="Enter Content..."
        />
        <button className="btn">Add</button>
      </form>
    </div>
  );
};
