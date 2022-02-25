import {
  Invoice,
  InvoiceFilter,
  RequestStatus,
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
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';

interface InvoiceInitialState extends BaseInitialState {
  searchFilter: InvoiceFilter;
  invoices: Invoice[];
  invoice: Invoice;
}

const initialState: InvoiceInitialState = {
  ...getBaseInitialState(),
  searchFilter: null,
  invoices: [],
  invoice: null
};

export const searchInvoices = createAsyncThunk(
  'invoice/searchInvoices',
  async (params: { filter: InvoiceFilter }, { getState }) => {
    const state = getState() as RootState;
    const response = await searchInvoicesRequest(
      state.business.business._id.toString(),
      params.filter || state.invoice.searchFilter || {}
    );
    return response.data;
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
      .addCase(searchInvoices.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(searchInvoices.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.invoices = action.payload.items;
        const newSearchFilter = transformSearchResultToFilter(action.payload);
        if (
          JSON.stringify(state.searchFilter) !== JSON.stringify(newSearchFilter)
        ) {
          state.searchFilter = newSearchFilter;
        }
      })
      .addCase(searchInvoices.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Get Invoice
      .addCase(getInvoice.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.invoice = action.payload;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Add Invoice
      .addCase(addInvoice.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(addInvoice.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Update Invoice
      .addCase(updateInvoice.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(updateInvoice.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Delete Invoice
      .addCase(deleteInvoice.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(deleteInvoice.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const { setNewSearchFilter } = invoiceSlice.actions;

export const selectInvoicesSearchFilter = (state: RootState) =>
  state.invoice.searchFilter;

export const selectInvoices = (state: RootState) => state.invoice.invoices;

export const selectInvoice = (state: RootState) => state.invoice.invoice;

export default invoiceSlice.reducer;
