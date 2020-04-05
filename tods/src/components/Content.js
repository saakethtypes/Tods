import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Content = ({ content, tid }) => {
  const { delete_content } = useContext(GlobalContext);
  const deleteContent = id => {
    delete_content(id, tid);
  };
  return (
    <div className="container">
      <h4>
        <p> {content.content_text}</p>
        <button className="dlt-btn" onClick={() => deleteContent(content._id)}>
          x
        </button>
      </h4>
    </div>
  );
};
