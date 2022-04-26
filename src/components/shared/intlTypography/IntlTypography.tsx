import { Typography } from 'material';
import React, { ElementType } from 'react';
import { FormattedMessage } from 'react-intl';

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

type IntlTypographyProps = {
  id: string;
  defaultMessage?: string;
  values?: Record<string, unknown>;
  variant?: Variant;
  className?: string;
  component?: ElementType;
};

const IntlTypography = ({
  id,
  defaultMessage,
  values,
  variant,
  className,
  component = 'span'
}: IntlTypographyProps) => {
  return (
    <Typography variant={variant} component={component} className={className}>
      <FormattedMessage
        id={id}
        defaultMessage={defaultMessage}
        values={values}
      />
    </Typography>
  );
};

export default IntlTypography;
