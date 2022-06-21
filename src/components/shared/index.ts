import Avatar from './avatar/Avatar';
import { BusinessCard, CompanyCard, PersonCard } from './cards';
import CategoriesLabelSet from './categoriesLabelSet/CategoriesLabelSet';
import CompanyLabel from './companyLabel/CompanyLabel';
import CountryLabel from './countryLabel/CountryLabel';
import CurrencyText from './currencyText/CurrencyText';
import DataTable from './dataTable/DataTable';
import DeleteDialog from './deleteDialog/DeleteDialog';
import FilterBar from './filterBar/FilterBar';
import Form from './form/Form';
import {
  CategoriesSelector,
  CurrencyAmountTextField,
  CurrencySelector,
  DateSelector,
  Selector,
  TextField,
  VatSelector
} from './inputs';
import IntlTypography from './intlTypography/IntlTypography';
import InvoiceDocument from './invoiceDocument/InvoiceDocument';
import InvoicePaymentStatus from './invoicePaymentStatus/InvoicePaymentStatus';
import LanguageSelector from './languageSelector/LanguageSelector';
import MenuButton from './menuButton/MenuButton';
import MessageToast from './messageToast/MessageToast';
import ObjectContentInfo from './objectContentInfo/ObjectContentInfo';
import PageHeader from './pageHeader/PageHeader';
import Panel from './panel/Panel';
import SearchBar from './searchBar/SearchBar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getComponent = (name: string): any => {
  if (name === 'Avatar') {
    return Avatar;
  }
  if (name === 'BusinessCard') {
    return BusinessCard;
  }
  if (name === 'CompanyCard') {
    return CompanyCard;
  }
  if (name === 'PersonCard') {
    return PersonCard;
  }
  if (name === 'CategoriesLabelSet') {
    return CategoriesLabelSet;
  }
  if (name === 'CompanyLabel') {
    return CompanyLabel;
  }
  if (name === 'CountryLabel') {
    return CountryLabel;
  }
  if (name === 'CurrencyText') {
    return CurrencyText;
  }
  if (name === 'DataTable') {
    return DataTable;
  }
  if (name === 'DeleteDialog') {
    return DeleteDialog;
  }
  if (name === 'FilterBar') {
    return FilterBar;
  }
  if (name === 'Form') {
    return Form;
  }
  if (name === 'IntlTypography') {
    return IntlTypography;
  }
  if (name === 'InvoiceDocument') {
    return InvoiceDocument;
  }
  if (name === 'InvoicePaymentStatus') {
    return InvoicePaymentStatus;
  }
  if (name === 'LanguageSelector') {
    return LanguageSelector;
  }
  if (name === 'MenuButton') {
    return MenuButton;
  }
  if (name === 'MessageToast') {
    return MessageToast;
  }
  if (name === 'ObjectContentInfo') {
    return ObjectContentInfo;
  }
  if (name === 'PageHeader') {
    return PageHeader;
  }
  if (name === 'Panel') {
    return Panel;
  }
  if (name === 'Searchbar') {
    return SearchBar;
  }
  return null;
};

export {
  getComponent,
  Avatar,
  BusinessCard,
  CompanyCard,
  PersonCard,
  CategoriesLabelSet,
  CompanyLabel,
  CountryLabel,
  CurrencyText,
  DataTable,
  DeleteDialog,
  FilterBar,
  Form,
  InvoiceDocument,
  IntlTypography,
  LanguageSelector,
  MenuButton,
  MessageToast,
  ObjectContentInfo,
  PageHeader,
  Panel,
  SearchBar,
  CategoriesSelector,
  CurrencyAmountTextField,
  CurrencySelector,
  DateSelector,
  Selector,
  TextField,
  VatSelector
};
