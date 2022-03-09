import {
  AccountBalanceIcon,
  BusinessIcon,
  CreditCardIcon,
  DescriptionIcon,
  HomeIcon,
  PeopleAltIcon,
  PercentIcon
} from 'material/icons';

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'AccountBalance':
      return AccountBalanceIcon;
    case 'Business':
      return BusinessIcon;
    case 'CreditCard':
      return CreditCardIcon;
    case 'Description':
      return DescriptionIcon;
    case 'Home':
      return HomeIcon;
    case 'PeopleAlt':
      return PeopleAltIcon;
    case 'Percent':
      return PercentIcon;
    default:
      return null;
  }
};
