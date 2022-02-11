import {
  RequestStatus,
  TaxYear,
  TaxYearFilter,
  TaxYearSearchResult
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addTaxYearRequest,
  deleteTaxYearRequest,
  getTaxYearRequest,
  searchTaxYearsRequest,
  updateTaxYearRequest
} from '../../http';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';
import { RootState } from '../store';

interface TaxYearInitialState extends BaseInitialState {
  searchResult: TaxYearSearchResult;
  taxYear: TaxYear;
}

const initialState: TaxYearInitialState = {
  ...getBaseInitialState(),
  searchResult: {
    items: []
  },
  taxYear: null
};

export const searchTaxYears = createAsyncThunk(
  'taxYear/searchTaxYears',
  async (params: { filter: TaxYearFilter }) => {
    const response = await searchTaxYearsRequest(params.filter);
    return response.data;
  }
);

export const getTaxYear = createAsyncThunk(
  'taxYear/getTaxYear',
  async (params: { id: string }) => {
    const response = await getTaxYearRequest(params.id);
    return response.data;
  }
);

export const addTaxYear = createAsyncThunk(
  'taxYear/addTaxYear',
  async (params: { taxYear: TaxYear }) => {
    const response = await addTaxYearRequest(params.taxYear);
    return response.data;
  }
);

export const updateTaxYear = createAsyncThunk(
  'taxYear/updateTaxYear',
  async (params: { id: string; taxYear: TaxYear }) => {
    const response = await updateTaxYearRequest(params.id, params.taxYear);
    return response.data;
  }
);

export const deleteTaxYear = createAsyncThunk(
  'taxYear/deleteTaxYear',
  async (params: { id: string }) => {
    const response = await deleteTaxYearRequest(params.id);
    return response.data;
  }
);

export const taxYearslice = createSlice({
  name: 'taxYear',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Search TaxYears
      .addCase(searchTaxYears.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(searchTaxYears.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.searchResult = action.payload;
      })
      .addCase(searchTaxYears.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Get TaxYear
      .addCase(getTaxYear.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getTaxYear.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.taxYear = action.payload;
      })
      .addCase(getTaxYear.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Add TaxYear
      .addCase(addTaxYear.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(addTaxYear.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(addTaxYear.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Update TaxYear
      .addCase(updateTaxYear.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(updateTaxYear.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(updateTaxYear.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Delete TaxYear
      .addCase(deleteTaxYear.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(deleteTaxYear.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(deleteTaxYear.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const selectTaxYears = (state: RootState) =>
  state.taxYear.searchResult.items;

export const selectTaxYear = (state: RootState) => state.taxYear.taxYear;

export default taxYearslice.reducer;
