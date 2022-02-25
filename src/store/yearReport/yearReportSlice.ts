import { RequestStatus, YearReport } from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getYearReportRequest } from 'http/yearReport';
import { RootState } from 'store';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';

interface YearReportInitialState extends BaseInitialState {
  yearReport: YearReport;
}

const initialState: YearReportInitialState = {
  ...getBaseInitialState(),
  yearReport: null
};

export const getYearReport = createAsyncThunk(
  'yearReport/getYearReport',
  async (params: { id: string }) => {
    const response = await getYearReportRequest(params.id);
    return response.data;
  }
);

export const yearReportslice = createSlice({
  name: 'yearReport',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Get YearReport
      .addCase(getYearReport.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getYearReport.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.yearReport = action.payload;
      })
      .addCase(getYearReport.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const selectYearReport = (state: RootState) =>
  state.yearReport.yearReport;

export default yearReportslice.reducer;
