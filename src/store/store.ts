import { configureStore } from '@reduxjs/toolkit';
import businessReducer from './business/businessSlice';
import categoryReducer from './category/categorySlice';
import companyReducer from './company/companySlice';
import i18nReducer from './i18n/i18nSlice';
import invoiceReducer from './invoice/invoiceSlice';
import nationalInsurancePaymentReducer from './nationalInsurancePayment/nationalInsurancePaymentSlice';
import personReducer from './person/personSlice';
import taxPaymentReducer from './taxPayment/taxPaymentSlice';
import taxYearReducer from './taxYear/taxYearSlice';
import userReducer from './user/userSlice';
import yearReportReducer from './yearReport/yearReportSlice';

const store = configureStore({
  reducer: {
    i18n: i18nReducer,
    business: businessReducer,
    category: categoryReducer,
    company: companyReducer,
    invoice: invoiceReducer,
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
