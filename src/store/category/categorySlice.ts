import {
  Category,
  CategoryFilter,
  CategorySearchResult,
  RequestStatus
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addCategoryRequest,
  deleteCategoryRequest,
  searchCategoriesRequest,
  updateCategoryRequest
} from 'http/category';
import { RootState } from 'store';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';

interface CategoryInitialState extends BaseInitialState {
  searchResult: CategorySearchResult;
}

const initialState: CategoryInitialState = {
  ...getBaseInitialState(),
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
    builder
      // Search Categories
      .addCase(searchCategories.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.searchResult = action.payload;
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const selectCategories = (state: RootState) =>
  state.category.searchResult.items;

export default categorySlice.reducer;
