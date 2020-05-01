import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Content = ({ content, tid }) => {
  const { delete_content } = useContext(GlobalContext);
  const deleteContent = id => {
    delete_content(id, tid);
  };
  return (
    <div className="contentView">
      {content.content_text}
      <div className="deleteContent" onClick={() => deleteContent(content._id)}>
        x
      </div>
    </div>
  );
};
