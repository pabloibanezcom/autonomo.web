import {
  Expense,
  ExpenseFilter,
  transformSearchResultToFilter
} from '@autonomo/common';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addExpenseRequest,
  deleteExpenseRequest,
  getExpenseRequest,
  searchExpensesRequest,
  updateExpenseRequest
} from 'http/expense';
import { RootState } from 'store';
import { simplifyError } from 'util/error';
import { setError, startLoading, stopLoading } from '../status/statusSlice';

interface ExpenseInitialState {
  searchFilter: ExpenseFilter;
  expenses: Expense[];
  expense: Expense;
}

const initialState: ExpenseInitialState = {
  searchFilter: null,
  expenses: [],
  expense: null
};

export const searchExpenses = createAsyncThunk(
  'expense/searchExpenses',
  async (params: { filter: ExpenseFilter }, { dispatch, getState }) => {
    const state = getState() as RootState;
    dispatch(startLoading());
    try {
      const response = await searchExpensesRequest(
        state.business.business._id.toString(),
        params.filter || state.expense.searchFilter || {}
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

export const getExpense = createAsyncThunk(
  'expense/getExpense',
  async (params: { id: string }, { getState }) => {
    const state = getState() as RootState;
    const response = await getExpenseRequest(
      state.business.business._id.toString(),
      params.id
    );
    return response.data;
  }
);

export const addExpense = createAsyncThunk(
  'expense/addExpense',
  async (params: { expense: Expense }, { dispatch, getState }) => {
    const state = getState() as RootState;
    dispatch(startLoading());
    try {
      const response = await addExpenseRequest(
        state.business.business._id.toString(),
        params.expense
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

export const updateExpense = createAsyncThunk(
  'expense/updateExpense',
  async (params: { id: string; expense: Expense }) => {
    const response = await updateExpenseRequest(params.id, params.expense);
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  async (params: { id: string }) => {
    const response = await deleteExpenseRequest(params.id);
    return response.data;
  }
);

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setNewSearchFilter(state, action: PayloadAction<ExpenseFilter>) {
      state.searchFilter = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Search Expenses
      .addCase(searchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload.items;
        const newSearchFilter = transformSearchResultToFilter(action.payload);
        if (
          JSON.stringify(state.searchFilter) !== JSON.stringify(newSearchFilter)
        ) {
          state.searchFilter = newSearchFilter;
        }
      })
      // Get Expense
      .addCase(getExpense.fulfilled, (state, action) => {
        state.expense = action.payload;
      });
  }
});

export const { setNewSearchFilter } = expenseSlice.actions;

export const selectExpensesSearchFilter = (state: RootState) =>
  state.expense.searchFilter;

export const selectExpenses = (state: RootState) => state.expense.expenses;

export const selectExpense = (state: RootState) => state.expense.expense;

export default expenseSlice.reducer;
