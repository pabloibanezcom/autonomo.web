import { Person, PersonFilter, PersonSearchResult } from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addPersonRequest,
  deletePersonRequest,
  getPersonRequest,
  searchPeopleRequest,
  updatePersonRequest
} from 'http/person';
import { RootState } from 'store';

interface PersonInitialState {
  searchResult: PersonSearchResult;
  person: Person;
}

const initialState: PersonInitialState = {
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
  reducers: {
    resetPersonState: () => initialState
  },
  extraReducers(builder) {
    builder
      .addCase(searchPeople.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      })
      .addCase(getPerson.fulfilled, (state, action) => {
        state.person = action.payload;
      });
  }
});

export const { resetPersonState } = personSlice.actions;

export const selectPeople = (state: RootState) =>
  state.person.searchResult.items;

export const selectPerson = (state: RootState) => state.person.person;

export default personSlice.reducer;
