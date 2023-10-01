import { SORT } from "../types/types";
const getSortString = (
  filter: string,
  optionalFilter: string | undefined,
  sortOption: string
) => {
  if (optionalFilter) {
    return `${filter},${optionalFilter}:${sortOption}` as SORT;
  }
  return `${filter}:${sortOption}` as SORT;
};

export { getSortString };
