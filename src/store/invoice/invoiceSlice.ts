import {
  Invoice,
  InvoiceFilter,
  transformSearchResultToFilter
} from '@autonomo/common';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addInvoiceRequest,
  deleteInvoiceRequest,
  getInvoiceRequest,
  searchInvoicesRequest,
  updateInvoiceRequest
} from 'http/invoice';
import { RootState } from 'store';
import { simplifyError } from 'util/error';
import { setError, startLoading, stopLoading } from '../status/statusSlice';

interface InvoiceInitialState {
  searchFilter: InvoiceFilter;
  invoices: Invoice[];
  invoice: Invoice;
}

const initialState: InvoiceInitialState = {
  searchFilter: null,
  invoices: [],
  invoice: null
};

export const searchInvoices = createAsyncThunk(
  'invoice/searchInvoices',
  async (params: { filter: InvoiceFilter }, { dispatch, getState }) => {
    const state = getState() as RootState;
    dispatch(startLoading());
    try {
      const response = await searchInvoicesRequest(
        state.business.business._id.toString(),
        params.filter || state.invoice.searchFilter || {}
      );
      dispatch(stopLoading());
      return response.data;
    } catch (err: unknown) {
      dispatch(stopLoading());
      dispatch(setError(simplifyError(err)));
      throw err;
    }
  }
);

export const getInvoice = createAsyncThunk(
  'invoice/getInvoice',
  async (params: { id: string }, { getState }) => {
    const state = getState() as RootState;
    const response = await getInvoiceRequest(
      state.business.business._id.toString(),
      params.id
    );
    return response.data;
  }
);

export const addInvoice = createAsyncThunk(
  'invoice/addInvoice',
  async (params: { invoice: Invoice }) => {
    const response = await addInvoiceRequest(params.invoice);
    return response.data;
  }
);

export const updateInvoice = createAsyncThunk(
  'invoice/updateInvoice',
  async (params: { id: string; invoice: Invoice }) => {
    const response = await updateInvoiceRequest(params.id, params.invoice);
    return response.data;
  }
);

export const deleteInvoice = createAsyncThunk(
  'invoice/deleteInvoice',
  async (params: { id: string }) => {
    const response = await deleteInvoiceRequest(params.id);
    return response.data;
  }
);

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setNewSearchFilter(state, action: PayloadAction<InvoiceFilter>) {
      state.searchFilter = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Search Invoices
      .addCase(searchInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload.items;
        const newSearchFilter = transformSearchResultToFilter(action.payload);
        if (
          JSON.stringify(state.searchFilter) !== JSON.stringify(newSearchFilter)
        ) {
          state.searchFilter = newSearchFilter;
        }
      })
      // Get Invoice
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.invoice = action.payload;
      });
  }
});

export const { setNewSearchFilter } = invoiceSlice.actions;

export const selectInvoicesSearchFilter = (state: RootState) =>
  state.invoice.searchFilter;

export const selectInvoices = (state: RootState) => state.invoice.invoices;

export const selectInvoice = (state: RootState) => state.invoice.invoice;

export default invoiceSlice.reducer;
