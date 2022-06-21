import { Company } from '@autonomo/common';
import { CountryLabel, IntlTypography } from 'components/shared';
import { Button } from 'material';
import BaseCard from '../baseCard/BaseCard';

type CompanyCardProps = {
  company: Company;
};

const CompanyCard = ({ company }: CompanyCardProps) => {
  const subheader = (
    <div className="d-flex flex-row mt-1">
      <div>
        {company.country && <CountryLabel code={company.country} flag />}
      </div>{' '}
    </div>
  );

  const actions = (
    <Button variant="outlined" fullWidth size="large">
      <IntlTypography component="span" id="companyCard.view" />
    </Button>
  );

  return (
    <BaseCard
      avatar={company.name}
      title={company.name}
      color={company.color}
      subheader={subheader}
      actions={actions}
    />
  );
};

export default CompanyCard;
