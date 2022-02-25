import {
  Company,
  CompanyFilter,
  CompanySearchResult,
  RequestStatus
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addCompanyRequest,
  deleteCompanyRequest,
  getCompanyRequest,
  searchCompaniesRequest,
  updateCompanyRequest
} from 'http/company';
import { RootState } from 'store';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';

interface CompanyInitialState extends BaseInitialState {
  searchResult: CompanySearchResult;
  company: Company;
}

const initialState: CompanyInitialState = {
  ...getBaseInitialState(),
  searchResult: {
    items: []
  },
  company: null
};

export const searchCompanies = createAsyncThunk(
  'company/searchCompanies',
  async (params: { filter: CompanyFilter }) => {
    const response = await searchCompaniesRequest(params.filter);
    return response.data;
  }
);

export const getCompany = createAsyncThunk(
  'company/getCompany',
  async (params: { id: string }) => {
    const response = await getCompanyRequest(params.id);
    return response.data;
  }
);

export const addCompany = createAsyncThunk(
  'company/addCompany',
  async (params: { company: Company }) => {
    const response = await addCompanyRequest(params.company);
    return response.data;
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async (params: { id: string; company: Company }) => {
    const response = await updateCompanyRequest(params.id, params.company);
    return response.data;
  }
);

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (params: { id: string }) => {
    const response = await deleteCompanyRequest(params.id);
    return response.data;
  }
);

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Search Companies
      .addCase(searchCompanies.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(searchCompanies.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.searchResult = action.payload;
      })
      .addCase(searchCompanies.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Get Company
      .addCase(getCompany.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.company = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Add Company
      .addCase(addCompany.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(addCompany.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Update Company
      .addCase(updateCompany.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(updateCompany.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Delete Company
      .addCase(deleteCompany.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(deleteCompany.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const selectCompanies = (state: RootState) =>
  state.company.searchResult.items;

export const selectCompany = (state: RootState) => state.company.company;

export default companySlice.reducer;
