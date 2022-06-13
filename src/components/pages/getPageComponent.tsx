import {
  AuthRootPage,
  BusinessDetailPage,
  ChangePasswordPage,
  CompaniesListPage,
  CompanyAddPage,
  CompanyDetailsPage,
  ExpenseAddPage,
  ExpenseDetailsPage,
  ExpensesListPage,
  HomePage,
  IncomeManagePage,
  IncomesListPage,
  InternalServerErrorPage,
  LoginPage,
  MyBusinessPage,
  MyProfilePage,
  NationalInsurancePaymentAddPage,
  NationalInsurancePaymentDetailsPage,
  NationalInsurancePaymentsListPage,
  PageNotFoundPage,
  PeopleListPage,
  PersonAddPage,
  PersonDetailsPage,
  RegisterPage,
  RootPage,
  TaxPaymentAddPage,
  TaxPaymentDetailsPage,
  TaxPaymentsListPage
} from '.';

const getPageComponent = (name: string) => {
  if (name === 'AuthRootPage') {
    return AuthRootPage;
  }
  if (name === 'ChangePasswordPage') {
    return ChangePasswordPage;
  }
  if (name === 'LoginPage') {
    return LoginPage;
  }
  if (name === 'RegisterPage') {
    return RegisterPage;
  }
  if (name === 'InternalServerErrorPage') {
    return InternalServerErrorPage;
  }
  if (name === 'PageNotFoundPage') {
    return PageNotFoundPage;
  }
  if (name === 'BusinessDetailPage') {
    return BusinessDetailPage;
  }
  if (name === 'CompaniesListPage') {
    return CompaniesListPage;
  }
  if (name === 'CompanyAddPage') {
    return CompanyAddPage;
  }
  if (name === 'CompanyDetailsPage') {
    return CompanyDetailsPage;
  }
  if (name === 'ExpenseAddPage') {
    return ExpenseAddPage;
  }
  if (name === 'ExpenseDetailsPage') {
    return ExpenseDetailsPage;
  }
  if (name === 'ExpensesListPage') {
    return ExpensesListPage;
  }
  if (name === 'HomePage') {
    return HomePage;
  }
  if (name === 'IncomeManagePage') {
    return IncomeManagePage;
  }
  if (name === 'IncomesListPage') {
    return IncomesListPage;
  }
  if (name === 'NationalInsurancePaymentAddPage') {
    return NationalInsurancePaymentAddPage;
  }
  if (name === 'NationalInsurancePaymentDetailsPage') {
    return NationalInsurancePaymentDetailsPage;
  }
  if (name === 'NationalInsurancePaymentsListPage') {
    return NationalInsurancePaymentsListPage;
  }
  if (name === 'PeopleListPage') {
    return PeopleListPage;
  }
  if (name === 'PersonAddPage') {
    return PersonAddPage;
  }
  if (name === 'PersonDetailsPage') {
    return PersonDetailsPage;
  }
  if (name === 'MyBusinessPage') {
    return MyBusinessPage;
  }
  if (name === 'MyProfilePage') {
    return MyProfilePage;
  }
  if (name === 'RootPage') {
    return RootPage;
  }
  if (name === 'TaxPaymentAddPage') {
    return TaxPaymentAddPage;
  }
  if (name === 'TaxPaymentDetailsPage') {
    return TaxPaymentDetailsPage;
  }
  if (name === 'TaxPaymentsListPage') {
    return TaxPaymentsListPage;
  }
  return null;
};

export default getPageComponent;
