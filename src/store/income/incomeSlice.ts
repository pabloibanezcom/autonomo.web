import {
  Income,
  IncomeFilter,
  transformSearchResultToFilter
} from '@autonomo/common';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addIncomeRequest,
  deleteIncomeRequest,
  getIncomeRequest,
  searchIncomesRequest,
  updateIncomeRequest
} from 'http/income';
import { RootState } from 'store';
import { simplifyError } from 'util/error';
import {
  setError,
  setMessageTitle,
  setRedirectUrl,
  startLoading,
  stopLoading
} from '../status/statusSlice';

interface IncomeInitialState {
  searchFilter: IncomeFilter;
  incomes: Income[];
  income: Income;
}

const initialState: IncomeInitialState = {
  searchFilter: null,
  incomes: [],
  income: null
};

export const searchIncomes = createAsyncThunk(
  'income/searchIncomes',
  async (params: { filter: IncomeFilter }, { dispatch, getState }) => {
    const state = getState() as RootState;
    dispatch(startLoading());
    try {
      const response = await searchIncomesRequest(
        state.business.business._id.toString(),
        params.filter || state.income.searchFilter || {}
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

export const getIncome = createAsyncThunk(
  'income/getIncome',
  async (params: { id: string }, { getState }) => {
    const state = getState() as RootState;
    const response = await getIncomeRequest(
      state.business.business._id.toString(),
      params.id
    );
    return response.data;
  }
);

export const addIncome = createAsyncThunk(
  'income/addIncome',
  async (params: { income: Income }, { dispatch, getState }) => {
    const state = getState() as RootState;
    dispatch(startLoading());
    try {
      const response = await addIncomeRequest(
        state.business.business._id.toString(),
        params.income
      );
      dispatch(stopLoading());
      dispatch(
        setMessageTitle({
          title: 'Invoice created',
          message: `Invoice ${response.data.number} was created succesfully`
        })
      );
      dispatch(setRedirectUrl('/incomes'));
      return response.data;
    } catch (err: unknown) {
      dispatch(stopLoading());
      dispatch(setError(simplifyError(err)));
      throw err;
    }
  }
);

export const updateIncome = createAsyncThunk(
  'income/updateIncome',
  async (params: { id: string; income: Income }) => {
    const response = await updateIncomeRequest(params.id, params.income);
    return response.data;
  }
);

export const deleteIncome = createAsyncThunk(
  'income/deleteIncome',
  async (params: { id: string }) => {
    const response = await deleteIncomeRequest(params.id);
    return response.data;
  }
);

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setNewSearchFilter(state, action: PayloadAction<IncomeFilter>) {
      state.searchFilter = action.payload;
    },
    clearIncomes(state) {
      state.incomes = [];
    },
    clearIncome(state) {
      state.income = null;
    }
  },
  extraReducers(builder) {
    builder
      // Search Incomes
      .addCase(searchIncomes.fulfilled, (state, action) => {
        state.incomes = action.payload.items;
        const newSearchFilter = transformSearchResultToFilter(action.payload);
        if (
          JSON.stringify(state.searchFilter) !== JSON.stringify(newSearchFilter)
        ) {
          state.searchFilter = newSearchFilter;
        }
      })
      // Get Income
      .addCase(getIncome.fulfilled, (state, action) => {
        state.income = action.payload;
      });
  }
});

export const { setNewSearchFilter, clearIncomes } = incomeSlice.actions;

export const selectIncomesSearchFilter = (state: RootState) =>
  state.income.searchFilter;

export const selectIncomes = (state: RootState) => state.income.incomes;

export const selectIncome = (state: RootState) => state.income.income;

export default incomeSlice.reducer;
