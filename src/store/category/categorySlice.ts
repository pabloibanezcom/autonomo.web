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

interface CategoryInitialState {
  searchResult: CategorySearchResult;
}

const initialState: CategoryInitialState = {
  searchResult: {
    items: []
  }
};

export const searchCategories = createAsyncThunk(
  'category/searchCategoryes',
  async (params: { filter: CategoryFilter }) => {
    const response = await searchCategoriesRequest(params.filter);
    return response.data;
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
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchCategories.fulfilled, (state, action) => {
      state.searchResult = action.payload;
    });
  }
});

export const selectCategories = (state: RootState) =>
  state.category.searchResult.items;

export default categorySlice.reducer;
