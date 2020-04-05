import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Error = () => {
  const { error } = useContext(GlobalContext);
  return <div>{error}</div>;
};
