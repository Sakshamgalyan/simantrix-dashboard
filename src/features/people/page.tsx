"use client";

import React from "react";
import { PeopleAdminProvider } from "./context";
import { PeopleContent } from "./components/people-content";

export const PeoplePage = () => {
  return (
    <PeopleAdminProvider>
      <PeopleContent />
    </PeopleAdminProvider>
  );
};

export default PeoplePage;
