import { Company, CompanyFilter, CompanySearchResult } from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addCompanyRequest,
  deleteCompanyRequest,
  getCompanyRequest,
  searchCompaniesRequest,
  updateCompanyRequest
} from 'http/company';
import { RootState } from 'store';

interface CompanyInitialState {
  searchResult: CompanySearchResult;
  company: Company;
}

const initialState: CompanyInitialState = {
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
      .addCase(searchCompanies.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.company = action.payload;
      });
  }
});

export const selectCompanies = (state: RootState) =>
  state.company.searchResult.items;

export const selectCompany = (state: RootState) => state.company.company;

export default companySlice.reducer;
