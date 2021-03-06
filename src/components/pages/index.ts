import {
  AuthRootPage,
  ChangePasswordPage,
  LoginPage,
  RegisterPage
} from './auth';
import { BusinessDetailPage } from './business';
import {
  CompaniesListPage,
  CompanyAddPage,
  CompanyDetailsPage
} from './companies';
import { InternalServerErrorPage, PageNotFoundPage } from './error';
import {
  ExpenseAddPage,
  ExpenseDetailsPage,
  ExpensesListPage
} from './expenses';
import getPageComponent from './getPageComponent';
import HomePage from './home/HomePage';
import { IncomeManagePage, IncomesListPage } from './incomes';
import {
  NationalInsurancePaymentAddPage,
  NationalInsurancePaymentDetailsPage,
  NationalInsurancePaymentsListPage
} from './national-insurance-payments';
import { PeopleListPage, PersonAddPage, PersonDetailsPage } from './people';
import RootPage from './root/RootPage';
import {
  TaxPaymentAddPage,
  TaxPaymentDetailsPage,
  TaxPaymentsListPage
} from './tax-payments';
import { MyBusinessPage, MyProfilePage } from './user';

export {
  AuthRootPage,
  ChangePasswordPage,
  LoginPage,
  RegisterPage,
  InternalServerErrorPage,
  PageNotFoundPage,
  BusinessDetailPage,
  CompaniesListPage,
  CompanyAddPage,
  CompanyDetailsPage,
  ExpenseAddPage,
  ExpenseDetailsPage,
  ExpensesListPage,
  HomePage,
  IncomeManagePage,
  IncomesListPage,
  NationalInsurancePaymentAddPage,
  NationalInsurancePaymentDetailsPage,
  NationalInsurancePaymentsListPage,
  PeopleListPage,
  PersonAddPage,
  PersonDetailsPage,
  MyBusinessPage,
  MyProfilePage,
  RootPage,
  TaxPaymentAddPage,
  TaxPaymentDetailsPage,
  TaxPaymentsListPage
};
export { getPageComponent };
