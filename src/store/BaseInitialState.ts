import { RequestStatus } from '@autonomo/common';

export default interface BaseInitialState {
  status: RequestStatus;
  error: string | null;
}

export const getBaseInitialState = (): BaseInitialState => {
  return { status: RequestStatus.idle, error: null };
};
