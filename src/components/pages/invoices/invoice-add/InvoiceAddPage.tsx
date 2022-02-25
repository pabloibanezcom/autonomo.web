import { PageHeader } from 'components/shared';
import { PageProps } from 'interfaces';
import React from 'react';

const InvoiceAddPage = ({ title, breadcrumbs }: PageProps) => {
  return (
    <div>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <div>Add invoice here</div>
    </div>
  );
};

export default InvoiceAddPage;
