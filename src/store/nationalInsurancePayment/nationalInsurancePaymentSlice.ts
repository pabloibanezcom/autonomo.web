import {
  NationalInsurancePayment,
  NationalInsurancePaymentFilter,
  NationalInsurancePaymentSearchResult,
  RequestStatus
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addNationalInsurancePaymentRequest,
  deleteNationalInsurancePaymentRequest,
  getNationalInsurancePaymentRequest,
  searchNationalInsurancePaymentsRequest,
  updateNationalInsurancePaymentRequest
} from 'http/nationalInsurancePayment';
import { RootState } from 'store';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';

interface NationalInsurancePaymentInitialState extends BaseInitialState {
  searchResult: NationalInsurancePaymentSearchResult;
  nationalInsurancePayment: NationalInsurancePayment;
}

const initialState: NationalInsurancePaymentInitialState = {
  ...getBaseInitialState(),
  searchResult: {
    items: []
  },
  nationalInsurancePayment: null
};

export const searchNationalInsurancePayments = createAsyncThunk(
  'nationalInsurancePayment/searchNationalInsurancePayments',
  async (params: { filter: NationalInsurancePaymentFilter }) => {
    const response = await searchNationalInsurancePaymentsRequest(
      params.filter
    );
    return response.data;
  }
);

export const getNationalInsurancePayment = createAsyncThunk(
  'nationalInsurancePayment/getNationalInsurancePayment',
  async (params: { id: string }) => {
    const response = await getNationalInsurancePaymentRequest(params.id);
    return response.data;
  }
);

export const addNationalInsurancePayment = createAsyncThunk(
  'nationalInsurancePayment/addNationalInsurancePayment',
  async (params: { nationalInsurancePayment: NationalInsurancePayment }) => {
    const response = await addNationalInsurancePaymentRequest(
      params.nationalInsurancePayment
    );
    return response.data;
  }
);

export const updateNationalInsurancePayment = createAsyncThunk(
  'nationalInsurancePayment/updateNationalInsurancePayment',
  async (params: {
    id: string;
    nationalInsurancePayment: NationalInsurancePayment;
  }) => {
    const response = await updateNationalInsurancePaymentRequest(
      params.id,
      params.nationalInsurancePayment
    );
    return response.data;
  }
);

export const deleteNationalInsurancePayment = createAsyncThunk(
  'nationalInsurancePayment/deleteNationalInsurancePayment',
  async (params: { id: string }) => {
    const response = await deleteNationalInsurancePaymentRequest(params.id);
    return response.data;
  }
);

export const nationalInsurancePaymentslice = createSlice({
  name: 'nationalInsurancePayment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Search NationalInsurancePayments
      .addCase(searchNationalInsurancePayments.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(searchNationalInsurancePayments.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.searchResult = action.payload;
      })
      .addCase(searchNationalInsurancePayments.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Get NationalInsurancePayment
      .addCase(getNationalInsurancePayment.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getNationalInsurancePayment.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.nationalInsurancePayment = action.payload;
      })
      .addCase(getNationalInsurancePayment.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Add NationalInsurancePayment
      .addCase(addNationalInsurancePayment.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(addNationalInsurancePayment.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(addNationalInsurancePayment.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Update NationalInsurancePayment
      .addCase(updateNationalInsurancePayment.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(updateNationalInsurancePayment.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(updateNationalInsurancePayment.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Delete NationalInsurancePayment
      .addCase(deleteNationalInsurancePayment.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(deleteNationalInsurancePayment.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(deleteNationalInsurancePayment.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const selectNationalInsurancePayments = (state: RootState) =>
  state.nationalInsurancePayment.searchResult.items;

export const selectNationalInsurancePayment = (state: RootState) =>
  state.nationalInsurancePayment.nationalInsurancePayment;

export default nationalInsurancePaymentslice.reducer;
