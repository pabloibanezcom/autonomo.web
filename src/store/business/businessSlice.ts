import {
  Business,
  BusinessFilter,
  BusinessSearchResult
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addBusinessRequest,
  getBusinessRequest,
  searchBusinessesRequest
} from 'http/business';
import { RootState } from 'store';

interface BusinessInitialState {
  searchResult: BusinessSearchResult;
  business: Business;
}

const initialState: BusinessInitialState = {
  searchResult: {
    items: []
  },
  business: null
};

export const searchBusinesses = createAsyncThunk(
  'business/searchBusinesses',
  async (params: { filter: BusinessFilter }) => {
    const response = await searchBusinessesRequest(params.filter);
    return response.data;
  }
);

export const getBusiness = createAsyncThunk(
  'business/getBusiness',
  async (params: { id: string }) => {
    const response = await getBusinessRequest(params.id);
    return response.data;
  }
);

export const addBusiness = createAsyncThunk(
  'business/addBusiness',
  async (params: { business: Business }) => {
    const response = await addBusinessRequest(params.business);
    return response.data;
  }
);

export const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchBusinesses.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.business = action.payload;
      });
  }
});

export const selectBusinesses = (state: RootState) =>
  state.business.searchResult.items;

export const selectBusiness = (state: RootState) => state.business.business;

export default businessSlice.reducer;
