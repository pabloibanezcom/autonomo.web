import { IntlTypography } from 'components/shared';
import { CircleFlag } from 'react-circle-flags';

type CountryLabelProps = {
  code: string;
  flag?: boolean;
};

const CountryLabel = ({ code, flag }: CountryLabelProps) => {
  return (
    <div className="d-flex align-items-center">
      {flag && (
        <CircleFlag
          countryCode={code.toLowerCase()}
          style={{ height: 16, width: 16, marginRight: 8 }}
        />
      )}
      <IntlTypography component="span" id={`country.${code.toLowerCase()}`} />
    </div>
  );
};

export default CountryLabel;
