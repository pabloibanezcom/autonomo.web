import { YearReport } from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getYearReportRequest } from 'http/yearReport';
import { RootState } from 'store';

interface YearReportInitialState {
  yearReport: YearReport;
}

const initialState: YearReportInitialState = {
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
  reducers: {
    resetYearReportState: () => initialState
  },
  extraReducers(builder) {
    builder.addCase(getYearReport.fulfilled, (state, action) => {
      state.yearReport = action.payload;
    });
  }
});

export const { resetYearReportState } = yearReportslice.actions;

export const selectYearReport = (state: RootState) =>
  state.yearReport.yearReport;

export default yearReportslice.reducer;
