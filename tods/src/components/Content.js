import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Content = ({ content, tid ,styl}) => {
  const { delete_content } = useContext(GlobalContext);
  const deleteContent = id => {
    delete_content(id, tid);
  };
  return (
    <div className="contentView">
      <span className={`${styl}`}>{content.content_text}</span>
      <div className={`deleteContent `} onClick={() => deleteContent(content._id)}>
        x
      </div>
    </div>
  );
};
