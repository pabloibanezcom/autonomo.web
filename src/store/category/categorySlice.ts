import {
  Category,
  CategoryFilter,
  CategorySearchResult
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addCategoryRequest,
  deleteCategoryRequest,
  searchCategoriesRequest,
  updateCategoryRequest
} from 'http/category';
import { RootState } from 'store';
import { simplifyError } from 'util/error';
import { setError, startLoading, stopLoading } from '../status/statusSlice';

interface CategoryInitialState {
  searchFilter: CategoryFilter;
  searchResult: CategorySearchResult;
}

const initialState: CategoryInitialState = {
  searchFilter: null,
  searchResult: {
    items: null
  }
};

export const searchCategories = createAsyncThunk(
  'category/searchCategoryes',
  async (params: { filter: CategoryFilter }, { dispatch, getState }) => {
    const state = getState() as RootState;
    dispatch(startLoading());
    try {
      const response = await searchCategoriesRequest(
        state.business.business._id.toString(),
        params.filter || state.category.searchFilter || {}
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

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (params: { category: Category }) => {
    const response = await addCategoryRequest(params.category);
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (params: { id: string; category: Category }) => {
    const response = await updateCategoryRequest(params.id, params.category);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (params: { id: string }) => {
    const response = await deleteCategoryRequest(params.id);
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCategoryState: () => initialState
  },
  extraReducers(builder) {
    builder.addCase(searchCategories.fulfilled, (state, action) => {
      state.searchResult = action.payload;
    });
  }
});

export const { resetCategoryState } = categorySlice.actions;

export const selectCategories = (state: RootState) =>
  state.category.searchResult.items;

export default categorySlice.reducer;
