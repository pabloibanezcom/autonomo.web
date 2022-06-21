import { Person } from '@autonomo/common';
import { CountryLabel, IntlTypography } from 'components/shared';
import { Button } from 'material';
import BaseCard from '../baseCard/BaseCard';

type PersonCardProps = {
  person: Person;
};

const PersonCard = ({ person }: PersonCardProps) => {
  const subheader = (
    <div className="d-flex flex-row mt-1">
      <div>{person && <CountryLabel code="GB" flag />}</div>{' '}
    </div>
  );

  const actions = (
    <Button variant="outlined" fullWidth size="large">
      <IntlTypography component="span" id="personCard.view" />
    </Button>
  );

  return (
    <BaseCard
      avatar={person.fullName}
      title={person.fullName}
      color={person.color}
      picture={person.picture}
      subheader={subheader}
      actions={actions}
    />
  );
};

export default PersonCard;
