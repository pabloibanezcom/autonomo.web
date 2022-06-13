import { PageHeader } from 'components/shared';
import PageProps from 'interfaces/PageProps';

const BusinessDetailPage = ({ breadcrumbs }: PageProps) => {
  return (
    <div>
      <PageHeader title="Business details" breadcrumbs={breadcrumbs} />
    </div>
  );
};

export default BusinessDetailPage;
