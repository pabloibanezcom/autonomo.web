import {
  Business,
  BusinessFilter,
  BusinessSearchResult,
  RequestStatus
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addBusinessRequest,
  getBusinessRequest,
  searchBusinessesRequest
} from '../../http';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';
import { RootState } from '../store';

interface BusinessInitialState extends BaseInitialState {
  searchResult: BusinessSearchResult;
  business: Business;
}

const initialState: BusinessInitialState = {
  ...getBaseInitialState(),
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
      // Search Businesses
      .addCase(searchBusinesses.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(searchBusinesses.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.searchResult = action.payload;
      })
      .addCase(searchBusinesses.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Get Business
      .addCase(getBusiness.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.business = action.payload;
      })
      .addCase(getBusiness.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Add Business
      .addCase(addBusiness.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(addBusiness.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(addBusiness.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const selectBusinesses = (state: RootState) =>
  state.business.searchResult.items;

export const selectBusiness = (state: RootState) => state.business.business;

export default businessSlice.reducer;
