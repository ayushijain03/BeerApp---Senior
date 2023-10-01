import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { SORT } from "../../types/types";
import { getTypeString } from "../../utils/filterType";
import { getSortString } from "../../utils/sortString";

interface BeerFilterProps {
  onFilterChange: (
    selectedFilter: string,
    prevFilter: string,
    searchTerm: string,
    sortOption: SORT
  ) => void;
}

const validBeerTypes = [
  "micro",
  "nano",
  "regional",
  "brewpub",
  "large",
  "planning",
  "bar",
  "contract",
  "proprietor",
  "closed",
];

const sortingOptions = [
  { value: "by_name", label: "Name" },
  { value: "by_city", label: "City" },
  { value: "by_dist", label: "Distance" },
  { value: "by_state", label: "State" },
  { value: "by_postal", label: "Postal" },
  { value: "by_country", label: "Country" },
  { value: "by_type", label: "Type" },
];

const BeerFilter: React.FC<BeerFilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("by_name");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SORT>("asc");

  const handleFilterChange = (event: any) => {
    const newFilter = event.target.value as string;
    const prevFilter = selectedFilter;
    setSelectedFilter(newFilter);
    const sortString = getSortString(getTypeString(newFilter), "name", sortOption);
    if (newFilter === "by_type") {
      setSearchTerm(validBeerTypes[0]);
      onFilterChange(newFilter, prevFilter, validBeerTypes[0], sortString);
    } else {
      setSearchTerm("");
      onFilterChange(newFilter, prevFilter, "", sortString);
    }
  };

  const handleSearchChange = (event: any) => {
    const newSearchTerm = event.target.value as string;
    setSearchTerm(newSearchTerm);
    const sortString = getSortString(getTypeString(selectedFilter), "name", sortOption);
    onFilterChange(selectedFilter, "", newSearchTerm, sortString);
  };

  const handleSortChange = (event: any) => {
    const newSortOption = event.target.value as SORT;
    setSortOption(newSortOption);
    const sortString = getSortString(getTypeString(selectedFilter), "name", newSortOption);
    onFilterChange(selectedFilter, "", searchTerm, sortString);
  };

  const handleReset = (event: any) => {
    const prevFilter = selectedFilter;
    setSearchTerm("");
    setSelectedFilter("by_name");
    setSortOption("asc");
    const sortString = getSortString(getTypeString("by_name"), undefined, "asc");
    onFilterChange("by_name", prevFilter, "", sortString);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel htmlFor="filter-select">Filter By</InputLabel>
          <Select
            id="filter-select"
            value={selectedFilter}
            onChange={handleFilterChange}
            label="Filter By"
          >
            {sortingOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        {selectedFilter === "by_type" ? (
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              id="type-select"
              value={searchTerm}
              onChange={handleSearchChange}
              label="Type"
            >
              {validBeerTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            key={selectedFilter}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor="sort-select">Sort By</InputLabel>
          <Select
            id="sort-select"
            value={sortOption}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default BeerFilter;
