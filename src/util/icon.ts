import {
  AccountBalanceIcon,
  BusinessIcon,
  CreditCardIcon,
  DescriptionIcon,
  DescriptionOutlinedIcon,
  HomeIcon,
  PeopleAltIcon,
  PeopleAltOutlinedIcon,
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
    case 'DescriptionOutlined':
      return DescriptionOutlinedIcon;
    case 'Home':
      return HomeIcon;
    case 'PeopleAlt':
      return PeopleAltIcon;
    case 'PeopleAltOutlined':
      return PeopleAltOutlinedIcon;
    case 'Percent':
      return PercentIcon;
    default:
      return null;
  }
};
