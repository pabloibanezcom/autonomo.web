import { Company, CompanyFilter } from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addCompanyRequest,
  deleteCompanyRequest,
  getCompanyRequest,
  searchCompaniesRequest,
  updateCompanyRequest
} from 'http/company';
import { RootState } from 'store';
import { simplifyError } from 'util/error';
import { setError, startLoading, stopLoading } from '../status/statusSlice';

interface CompanyInitialState {
  searchFilter: CompanyFilter;
  items: Company[];
  company: Company;
}

const initialState: CompanyInitialState = {
  searchFilter: {
    pagination: {
      page: 0,
      items: 12
    },
    sorting: {
      sortBy: 'name'
    }
  },
  items: [],
  company: null
};

export const searchCompanies = createAsyncThunk(
  'company/searchCompanies',
  async (params: { filter: CompanyFilter }, { dispatch, getState }) => {
    dispatch(startLoading());
    try {
      const state = getState() as RootState;
      const response = await searchCompaniesRequest(
        state.business.business._id.toString(),
        params.filter || state.company.searchFilter
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
  reducers: {
    resetCompanyState: () => initialState
  },
  extraReducers(builder) {
    builder
      .addCase(searchCompanies.fulfilled, (state, action) => {
        const { items, ...searchFilter } = action.payload;
        state.items = items;
        state.searchFilter = searchFilter;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.company = action.payload;
      });
  }
});

export const { resetCompanyState } = companySlice.actions;

export const selectCompanyFilter = (state: RootState) =>
  state.company.searchFilter;

export const selectCompanies = (state: RootState) => state.company.items;

export const selectCompany = (state: RootState) => state.company.company;

export default companySlice.reducer;
