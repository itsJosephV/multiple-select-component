import { createContext } from "react";
import { FnContextValue } from "../types";

export const FnContext = createContext<FnContextValue | null>(null);
