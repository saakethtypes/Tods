import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddContent = ({ todo_id ,styl}) => {
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
    <div className="EditandAdd">
      <form onSubmit={submitContent}>
        <input
          type="text"
          value={newContent}
          className={`ContentInput ${styl}`}
          onChange={e => setNewContent(e.target.value)}
          placeholder="lot of work? oof"
        />
        <button className={`Addcontentbutin ${styl}`}>+</button>
      </form>
    </div>
  );
};
