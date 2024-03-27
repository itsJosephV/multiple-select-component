import { useContext } from "react";
import { FnContext } from "./FnContext";

export const useFnContext = () => {
  const context = useContext(FnContext);

  if (!context) {
    throw new Error("no context provider");
  }

  return context;
};
