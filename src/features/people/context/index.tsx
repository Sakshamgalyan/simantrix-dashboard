"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { PeopleAdminState } from "../types";
import type { PeopleAdminAction } from "./action";
import { initialPeopleAdminState, peopleAdminReducer } from "./reducer";

interface PeopleAdminContextType {
  state: PeopleAdminState;
  dispatch: React.Dispatch<PeopleAdminAction>;
}

const PeopleAdminContext = createContext<PeopleAdminContextType | undefined>(
  undefined,
);

export const PeopleAdminProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    peopleAdminReducer,
    initialPeopleAdminState,
  );

  return (
    <PeopleAdminContext.Provider value={{ state, dispatch }}>
      {children}
    </PeopleAdminContext.Provider>
  );
};

export const usePeopleAdmin = () => {
  const ctx = useContext(PeopleAdminContext);
  if (!ctx) {
    throw new Error("usePeopleAdmin must be used within a PeopleAdminProvider");
  }
  return ctx;
};
