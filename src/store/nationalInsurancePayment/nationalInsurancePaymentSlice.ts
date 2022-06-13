import {
  NationalInsurancePayment,
  NationalInsurancePaymentFilter,
  NationalInsurancePaymentSearchResult
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

interface NationalInsurancePaymentInitialState {
  searchResult: NationalInsurancePaymentSearchResult;
  nationalInsurancePayment: NationalInsurancePayment;
}

const initialState: NationalInsurancePaymentInitialState = {
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
  reducers: {
    resetNationalInsurancePaymentState: () => initialState
  },
  extraReducers(builder) {
    builder
      .addCase(searchNationalInsurancePayments.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      })
      .addCase(getNationalInsurancePayment.fulfilled, (state, action) => {
        state.nationalInsurancePayment = action.payload;
      });
  }
});

export const { resetNationalInsurancePaymentState } =
  nationalInsurancePaymentslice.actions;

export const selectNationalInsurancePayments = (state: RootState) =>
  state.nationalInsurancePayment.searchResult.items;

export const selectNationalInsurancePayment = (state: RootState) =>
  state.nationalInsurancePayment.nationalInsurancePayment;

export default nationalInsurancePaymentslice.reducer;
