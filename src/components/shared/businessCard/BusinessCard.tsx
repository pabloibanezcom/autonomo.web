import { Business, BusinessRole, BusinessType, Person } from '@autonomo/common';
import { CountryLabel, IntlTypography, MenuButton } from 'components/shared';
import MenuItemEl from 'interfaces/MenuItemEl';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  Typography
} from 'material';
import { BusinessIcon, MoreVertIcon, PersonIcon } from 'material/icons';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getBusiness } from 'store';
import { formatDate } from 'util/date';
import { getFullName } from 'util/person';

type BusinessCardProps = {
  business: Business;
};

type ContentItem = {
  id: string;
  value: unknown;
  href?: string;
};

const contentInfoRow = (item: ContentItem) => (
  <div className="d-flex flex-row">
    <IntlTypography component="span" id={item.id} />:
    {!item.href ? (
      <Typography className="fst-italic ms-2">{item.value}</Typography>
    ) : (
      <Link component={RouterLink} to={item.href} className="fw-bold ms-2">
        {item.value}
      </Link>
    )}
  </div>
);

const generateBusinessContentItems = (business: Business): ContentItem[] => {
  const personLink = (id: string, person: Person) => {
    return {
      id,
      value: getFullName(person),
      href: `/people/${person._id}`
    };
  };

  const items: ContentItem[] = [];
  if (business.type === 'company') {
    items.push(personLink('businessCard.director', business.company.director));
    items.push({
      id: 'businessCard.incorporationDate',
      value: formatDate(business.company.creationDate)
    });
  }
  if (business.type === BusinessType.SoleTrader) {
    items.push(personLink('businessCard.soleTrader', business.soleTrader));
    items.push({
      id: 'businessCard.tradingStartDate',
      value: formatDate(business.tradingStartDate)
    });
  }
  const accountant = business.people.find(
    (p) => p.role === BusinessRole.Accountant
  )?.person as Person;
  if (accountant) {
    items.push(personLink('businessCard.accountant', accountant));
  }

  return items;
};

const BusinessCard = ({ business }: BusinessCardProps) => {
  const dispatch = useDispatch();
  const handleManageBusiness = () => {
    dispatch(getBusiness({ id: business._id.toString(), freshBusiness: true }));
  };

  const avatar = <Avatar>{business.name.slice(0, 2).toUpperCase()}</Avatar>;

  const title = <span className="fw-bold">{business.name}</span>;

  const TypeIcon = business.type === 'company' ? BusinessIcon : PersonIcon;

  const subheader = (
    <div className="d-flex flex-row mt-1">
      <div className="me-1 me-2 d-flex flex-row align-items-center">
        <TypeIcon fontSize="small" color="primary" className="me-1" />
        <IntlTypography
          component="span"
          className="text-nowrap"
          id={`businessType.${business.type}`}
        />
      </div>{' '}
      |{' '}
      <div className="ms-2 me-2">
        <CountryLabel code={business.country} flag />
      </div>{' '}
    </div>
  );

  const content = (
    <div>
      {generateBusinessContentItems(business).map((item, i) => (
        <Fragment key={i}>{contentInfoRow(item)}</Fragment>
      ))}
    </div>
  );

  const menuItems: MenuItemEl[] = [
    {
      id: 'businessCard.viewBusiness',
      navigateTo: `/business/${business._id}`
    }
  ];

  return (
    <Card>
      <CardHeader
        avatar={avatar}
        action={
          <MenuButton isIconButton menuItems={menuItems}>
            <MoreVertIcon />
          </MenuButton>
        }
        title={title}
        subheader={subheader}
      />
      <CardContent>{content}</CardContent>
      <CardActions className="d-flex flex-row-reverse">
        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={handleManageBusiness}
        >
          <IntlTypography component="span" id="businessCard.manageBusiness" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default BusinessCard;
