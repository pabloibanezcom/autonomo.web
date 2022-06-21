import { Person, PersonFilter } from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addPersonRequest,
  deletePersonRequest,
  getPersonRequest,
  searchPeopleRequest,
  updatePersonRequest
} from 'http/person';
import { RootState } from 'store';
import { simplifyError } from 'util/error';
import { setError, startLoading, stopLoading } from '../status/statusSlice';

interface PersonInitialState {
  searchFilter: PersonFilter;
  items: Person[];
  person: Person;
}

const initialState: PersonInitialState = {
  searchFilter: {
    pagination: {
      page: 0,
      items: 12
    },
    sorting: {
      sortBy: 'firstName'
    }
  },
  items: [],
  person: null
};

export const searchPeople = createAsyncThunk(
  'person/searchPeople',
  async (params: { filter: PersonFilter }, { dispatch, getState }) => {
    dispatch(startLoading());
    try {
      const state = getState() as RootState;
      const response = await searchPeopleRequest(
        state.business.business._id.toString(),
        params.filter || state.person.searchFilter
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
        const { items, ...searchFilter } = action.payload;
        state.items = items;
        state.searchFilter = searchFilter;
      })
      .addCase(getPerson.fulfilled, (state, action) => {
        state.person = action.payload;
      });
  }
});

export const { resetPersonState } = personSlice.actions;

export const selectPersonFilter = (state: RootState) =>
  state.person.searchFilter;

export const selectPeople = (state: RootState) => state.person.items;

export const selectPerson = (state: RootState) => state.person.person;

export default personSlice.reducer;
