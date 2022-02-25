import {
  Person,
  PersonFilter,
  PersonSearchResult,
  RequestStatus
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addPersonRequest,
  deletePersonRequest,
  getPersonRequest,
  searchPeopleRequest,
  updatePersonRequest
} from 'http/person';
import { RootState } from 'store';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';

interface PersonInitialState extends BaseInitialState {
  searchResult: PersonSearchResult;
  person: Person;
}

const initialState: PersonInitialState = {
  ...getBaseInitialState(),
  searchResult: {
    items: []
  },
  person: null
};

export const searchPeople = createAsyncThunk(
  'person/searchPeople',
  async (params: { filter: PersonFilter }) => {
    const response = await searchPeopleRequest(params.filter);
    return response.data;
  }
);

export const getPerson = createAsyncThunk(
  'person/getPerson',
  async (params: { id: string }) => {
    const response = await getPersonRequest(params.id);
    return response.data;
  }
);

export const addPerson = createAsyncThunk(
  'person/addPerson',
  async (params: { person: Person }) => {
    const response = await addPersonRequest(params.person);
    return response.data;
  }
);

export const updatePerson = createAsyncThunk(
  'person/updatePerson',
  async (params: { id: string; person: Person }) => {
    const response = await updatePersonRequest(params.id, params.person);
    return response.data;
  }
);

export const deletePerson = createAsyncThunk(
  'person/deletePerson',
  async (params: { id: string }) => {
    const response = await deletePersonRequest(params.id);
    return response.data;
  }
);

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Search People
      .addCase(searchPeople.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(searchPeople.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.searchResult = action.payload;
      })
      .addCase(searchPeople.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Get Person
      .addCase(getPerson.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getPerson.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.person = action.payload;
      })
      .addCase(getPerson.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Add Person
      .addCase(addPerson.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(addPerson.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(addPerson.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Update Person
      .addCase(updatePerson.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(updatePerson.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(updatePerson.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
      // Delete Person
      .addCase(deletePerson.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(deletePerson.fulfilled, (state) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(deletePerson.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const selectPeople = (state: RootState) =>
  state.person.searchResult.items;

export const selectPerson = (state: RootState) => state.person.person;

export default personSlice.reducer;
