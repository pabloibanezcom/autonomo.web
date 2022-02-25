import {
  AccountBalance,
  Business,
  CreditCard,
  Description,
  Home,
  PeopleAlt,
  Percent
} from '@mui/icons-material';

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'AccountBalance':
      return AccountBalance;
    case 'Business':
      return Business;
    case 'CreditCard':
      return CreditCard;
    case 'Description':
      return Description;
    case 'Home':
      return Home;
    case 'PeopleAlt':
      return PeopleAlt;
    case 'Percent':
      return Percent;
    default:
      return null;
  }
};
