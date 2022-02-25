import { PageHeader } from 'components/shared';
import { PageProps } from 'interfaces';
import React from 'react';

const NationalInsurancePaymentsListPage = ({
  title,
  breadcrumbs
}: PageProps) => {
  return (
    <div>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <div>{title}</div>
    </div>
  );
};

export default NationalInsurancePaymentsListPage;
