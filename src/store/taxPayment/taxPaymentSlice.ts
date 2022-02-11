import {
  RequestStatus,
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
} from '../../http';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';
import { RootState } from '../store';

interface TaxPaymentInitialState extends BaseInitialState {
  searchResult: TaxPaymentSearchResult;
  taxPayment: TaxPayment;
}

const initialState: TaxPaymentInitialState = {
  ...getBaseInitialState(),
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
      // Search TaxPayments
      .addCase(searchTaxPayments.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(searchTaxPayments.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.searchResult = action.payload;
      })
      .addCase(searchTaxPayments.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Get TaxPayment
      .addCase(getTaxPayment.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getTaxPayment.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.taxPayment = action.payload;
      })
      .addCase(getTaxPayment.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Add TaxPayment
      .addCase(addTaxPayment.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(addTaxPayment.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(addTaxPayment.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Update TaxPayment
      .addCase(updateTaxPayment.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(updateTaxPayment.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(updateTaxPayment.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Delete TaxPayment
      .addCase(deleteTaxPayment.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(deleteTaxPayment.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(deleteTaxPayment.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const selectTaxPayments = (state: RootState) =>
  state.taxPayment.searchResult.items;

export const selectTaxPayment = (state: RootState) =>
  state.taxPayment.taxPayment;

export default taxPaymentslice.reducer;
