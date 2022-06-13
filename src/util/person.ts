import { Person } from '@autonomo/common';

export const getFullName = (person: Person): string => {
  return `${person.firstName} ${person.lastName}`;
};
