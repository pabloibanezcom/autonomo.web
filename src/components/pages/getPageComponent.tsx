import {
  ChangePasswordPage,
  CompaniesListPage,
  CompanyAddPage,
  CompanyDetailsPage,
  ExpenseAddPage,
  ExpenseDetailsPage,
  ExpensesListPage,
  HomePage,
  InvoiceAddPage,
  InvoiceDetailsPage,
  InvoicesListPage,
  LoginPage,
  MyBusinessPage,
  MyProfilePage,
  NationalInsurancePaymentAddPage,
  NationalInsurancePaymentDetailsPage,
  NationalInsurancePaymentsListPage,
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
  if (name === 'ChangePasswordPage') {
    return ChangePasswordPage;
  }
  if (name === 'LoginPage') {
    return LoginPage;
  }
  if (name === 'RegisterPage') {
    return RegisterPage;
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
  if (name === 'InvoiceAddPage') {
    return InvoiceAddPage;
  }
  if (name === 'InvoiceDetailsPage') {
    return InvoiceDetailsPage;
  }
  if (name === 'InvoicesListPage') {
    return InvoicesListPage;
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
