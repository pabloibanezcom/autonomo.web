import { PageHeader } from 'components/shared';
import { PageProps } from 'interfaces';

const PersonDetailsPage = ({ title, breadcrumbs }: PageProps) => {
  return (
    <div>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <div>{title}</div>
    </div>
  );
};

export default PersonDetailsPage;
