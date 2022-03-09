import {
  TaxPayment,
  TaxPaymentFilter,
  TaxPaymentSearchResult
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addTaxPaymentRequest,
  deleteTaxPaymentRequest,
  getTaxPaymentRequest,
  searchTaxPaymentsRequest,
  updateTaxPaymentRequest
} from 'http/taxPayment';
import { RootState } from 'store';

interface TaxPaymentInitialState {
  searchResult: TaxPaymentSearchResult;
  taxPayment: TaxPayment;
}

const initialState: TaxPaymentInitialState = {
  searchResult: {
    items: []
  },
  taxPayment: null
};

export const searchTaxPayments = createAsyncThunk(
  'taxPayment/searchTaxPayments',
  async (params: { filter: TaxPaymentFilter }) => {
    const response = await searchTaxPaymentsRequest(params.filter);
    return response.data;
  }
);

export const getTaxPayment = createAsyncThunk(
  'taxPayment/getTaxPayment',
  async (params: { id: string }) => {
    const response = await getTaxPaymentRequest(params.id);
    return response.data;
  }
);

export const addTaxPayment = createAsyncThunk(
  'taxPayment/addTaxPayment',
  async (params: { taxPayment: TaxPayment }) => {
    const response = await addTaxPaymentRequest(params.taxPayment);
    return response.data;
  }
);

export const updateTaxPayment = createAsyncThunk(
  'taxPayment/updateTaxPayment',
  async (params: { id: string; taxPayment: TaxPayment }) => {
    const response = await updateTaxPaymentRequest(
      params.id,
      params.taxPayment
    );
    return response.data;
  }
);

export const deleteTaxPayment = createAsyncThunk(
  'taxPayment/deleteTaxPayment',
  async (params: { id: string }) => {
    const response = await deleteTaxPaymentRequest(params.id);
    return response.data;
  }
);

export const taxPaymentslice = createSlice({
  name: 'taxPayment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchTaxPayments.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      })
      .addCase(getTaxPayment.fulfilled, (state, action) => {
        state.taxPayment = action.payload;
      });
  }
});

export const selectTaxPayments = (state: RootState) =>
  state.taxPayment.searchResult.items;

export const selectTaxPayment = (state: RootState) =>
  state.taxPayment.taxPayment;

export default taxPaymentslice.reducer;
