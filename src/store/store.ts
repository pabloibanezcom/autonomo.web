import { configureStore } from '@reduxjs/toolkit';
import { intlReducer } from 'react-intl-redux';
import businessReducer from './business/businessSlice';
import categoryReducer from './category/categorySlice';
import companyReducer from './company/companySlice';
import expenseReducer from './expense/expenseSlice';
import incomeReducer from './income/incomeSlice';
import nationalInsurancePaymentReducer from './nationalInsurancePayment/nationalInsurancePaymentSlice';
import personReducer from './person/personSlice';
import preferencesReducer from './preferences/preferencesSlice';
import statusReducer from './status/statusSlice';
import taxPaymentReducer from './taxPayment/taxPaymentSlice';
import taxYearReducer from './taxYear/taxYearSlice';
import userReducer from './user/userSlice';
import yearReportReducer from './yearReport/yearReportSlice';

const store = configureStore({
  reducer: {
    status: statusReducer,
    intl: intlReducer,
    preferences: preferencesReducer,
    business: businessReducer,
    category: categoryReducer,
    company: companyReducer,
    expense: expenseReducer,
    income: incomeReducer,
    nationalInsurancePayment: nationalInsurancePaymentReducer,
    person: personReducer,
    taxPayment: taxPaymentReducer,
    taxYear: taxYearReducer,
    user: userReducer,
    yearReport: yearReportReducer
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
