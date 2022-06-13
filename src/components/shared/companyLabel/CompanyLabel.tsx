import { Company } from '@autonomo/common';
import { Typography } from 'material';
import Avatar from '../avatar/Avatar';

type CompanyLabelProps = {
  company: Company;
};

const CompanyLabel = ({ company }: CompanyLabelProps) => {
  return (
    <div className="d-flex align-items-center">
      <Avatar element={company} />
      <Typography component="span" className="ms-2">
        {company.name}
      </Typography>
    </div>
  );
};

export default CompanyLabel;
