import {
  insertParamsInRoute,
  Person,
  PersonFilter,
  PersonSearchResult,
  Routes
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchPeopleRequest = (
  searchFilter: PersonFilter
): AxiosPromise<PersonSearchResult> => {
  return axios.post(Routes.SEARCH_PEOPLE, searchFilter);
};

export const getPersonRequest = (id: string): AxiosPromise<Person> => {
  return axios.get(insertParamsInRoute(Routes.GET_PERSON, { id }));
};

export const addPersonRequest = (person: Person): AxiosPromise<Person> => {
  return axios.post(Routes.ADD_PERSON, person);
};

export const updatePersonRequest = (
  id: string,
  person: Person
): AxiosPromise<Person> => {
  return axios.put(insertParamsInRoute(Routes.UPDATE_PERSON, { id }), person);
};

export const deletePersonRequest = (id: string): AxiosPromise<Person> => {
  return axios.delete(insertParamsInRoute(Routes.DELETE_PERSON, { id }));
};
