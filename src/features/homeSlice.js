import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: {},
  genresAndSortByFilter: null,
  pageSearch: 1,
  pageExplore: 1,
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
    setPageSearch: (state, action) => {
      state.pageSearch = action.payload;
    },
    setPageExplore: (state, action) => {
      state.pageExplore = action.payload;
    },
    getGenresAndSortByFilter: (state, action) => {
      state.genresAndSortByFilter = action.payload;
    },
  },
});

export const {
  getGenres,
  setPageSearch,
  setPageExplore,
  getGenresAndSortByFilter,
} = slice.actions;

export default slice.reducer;
