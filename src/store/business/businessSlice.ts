import {
  Business,
  BusinessFilter,
  BusinessSearchResult
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addBusinessRequest,
  getBusinessRequest,
  searchBusinessesRequest
} from 'http/business';
import { RootState } from 'store';
import { resetCategoryState } from 'store/category/categorySlice';
import { resetCompanyState } from 'store/company/companySlice';
import { resetExpenseState } from 'store/expense/expenseSlice';
import { resetIncomeState } from 'store/income/incomeSlice';
import { resetNationalInsurancePaymentState } from 'store/nationalInsurancePayment/nationalInsurancePaymentSlice';
import { resetPersonState } from 'store/person/personSlice';
import { resetTaxPaymentState } from 'store/taxPayment/taxPaymentSlice';
import { resetYearReportState } from 'store/yearReport/yearReportSlice';
import { simplifyError } from 'util/error';
import {
  setError,
  setRedirectUrl,
  startLoading,
  stopLoading
} from '../status/statusSlice';

interface BusinessInitialState {
  searchResult: BusinessSearchResult;
  business: Business;
}

const initialState: BusinessInitialState = {
  searchResult: {
    items: []
  },
  business: null
};

export const searchBusinesses = createAsyncThunk(
  'business/searchBusinesses',
  async (params: { filter: BusinessFilter }, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await searchBusinessesRequest(params.filter);
      dispatch(stopLoading());
      return response.data;
    } catch (err: unknown) {
      dispatch(stopLoading());
      dispatch(setError(simplifyError(err)));
      throw err;
    }
  }
);

export const getBusiness = createAsyncThunk(
  'business/getBusiness',
  async (params: { id: string; freshBusiness?: boolean }, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await getBusinessRequest(params.id);
      dispatch(stopLoading());
      if (params.freshBusiness) {
        localStorage.setItem('business', params.id);
        dispatch(resetCategoryState());
        dispatch(resetIncomeState());
        dispatch(resetCompanyState());
        dispatch(resetExpenseState());
        dispatch(resetIncomeState());
        dispatch(resetNationalInsurancePaymentState());
        dispatch(resetPersonState());
        dispatch(resetTaxPaymentState());
        dispatch(resetYearReportState());

        dispatch(setRedirectUrl('/home'));
      }
      return response.data;
    } catch (err: unknown) {
      dispatch(stopLoading());
      dispatch(setError(simplifyError(err)));
      throw err;
    }
  }
);

export const addBusiness = createAsyncThunk(
  'business/addBusiness',
  async (params: { business: Business }) => {
    const response = await addBusinessRequest(params.business);
    return response.data;
  }
);

export const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchBusinesses.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.business = action.payload;
      });
  }
});

export const selectBusinesses = (state: RootState) =>
  state.business.searchResult.items;

export const selectBusiness = (state: RootState) => state.business.business;

export default businessSlice.reducer;
