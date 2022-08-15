import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface cityState {
  list: City[];
  loading: boolean;
}

const initialState: cityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityData(state) {
      state.loading = true;
    },
    fetchCityDataSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityDataFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const cityActions = citySlice.actions;
// Selectors
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: string }, city) => {
    map[city.code] = city.name;
    return map;
  }, {})
);
export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city)=>{
    return {
      label: city.name,
      value: city.code
    }
  })
);
// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
