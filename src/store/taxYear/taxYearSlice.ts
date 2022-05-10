import { TaxYear, TaxYearFilter, TaxYearSearchResult } from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addTaxYearRequest,
  deleteTaxYearRequest,
  getBusinessTaxYearRequest,
  getTaxYearRequest,
  searchTaxYearsRequest,
  updateTaxYearRequest
} from 'http/taxYear';
import { RootState } from 'store';

interface TaxYearInitialState {
  searchResult: TaxYearSearchResult;
  taxYear: TaxYear;
}

const initialState: TaxYearInitialState = {
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

export const getBusinessTaxYear = createAsyncThunk(
  'taxYear/getBusinessTaxYear',
  async (params: { businessId: string }) => {
    const response = await getBusinessTaxYearRequest(params.businessId);
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
      .addCase(searchTaxYears.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      })
      .addCase(getTaxYear.fulfilled, (state, action) => {
        state.taxYear = action.payload;
      })
      .addCase(getBusinessTaxYear.fulfilled, (state, action) => {
        state.taxYear = action.payload;
      });
  }
});

export const selectTaxYears = (state: RootState) =>
  state.taxYear.searchResult.items;

export const selectTaxYear = (state: RootState) => state.taxYear.taxYear;

export default taxYearslice.reducer;
