import type { PeopleAdminState } from "../types";
import type { PeopleAdminAction } from "./action";

export const initialPeopleAdminState: PeopleAdminState = {
  currentTab: "overview",
  searchQuery: "",
  departmentFilter: "",
  statusFilter: "",
  page: 1,
  limit: 15,
};

export const peopleAdminReducer = (
  state: PeopleAdminState,
  action: PeopleAdminAction,
): PeopleAdminState => {
  switch (action.type) {
    case "SET_TAB":
      return { ...state, currentTab: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload, page: 1 };
    case "SET_DEPARTMENT_FILTER":
      return { ...state, departmentFilter: action.payload, page: 1 };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "RESET_FILTERS":
      return {
        ...state,
        searchQuery: "",
        departmentFilter: "",
        statusFilter: "",
        page: 1,
      };
    default:
      return state;
  }
};
