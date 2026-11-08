import type { PeopleAdminTab } from "../types";

export type PeopleAdminAction =
  | { type: "SET_TAB"; payload: PeopleAdminTab }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_DEPARTMENT_FILTER"; payload: string }
  | { type: "SET_STATUS_FILTER"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "RESET_FILTERS" };

export const setTabAction = (tab: PeopleAdminTab): PeopleAdminAction => ({
  type: "SET_TAB",
  payload: tab,
});

export const setSearchAction = (search: string): PeopleAdminAction => ({
  type: "SET_SEARCH",
  payload: search,
});

export const setDepartmentFilterAction = (
  departmentId: string,
): PeopleAdminAction => ({
  type: "SET_DEPARTMENT_FILTER",
  payload: departmentId,
});

export const setStatusFilterAction = (status: string): PeopleAdminAction => ({
  type: "SET_STATUS_FILTER",
  payload: status,
});

export const setPageAction = (page: number): PeopleAdminAction => ({
  type: "SET_PAGE",
  payload: page,
});

export const resetFiltersAction = (): PeopleAdminAction => ({
  type: "RESET_FILTERS",
});
