import { Business } from '@autonomo/common';
import { BusinessCard, PageHeader } from 'components/shared';
import { PageProps } from 'interfaces';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchBusinesses, selectBusinesses } from 'store';

const MyBusinessPage = ({ title, breadcrumbs }: PageProps) => {
  const dispatch = useDispatch();
  const businesses: Business[] = useSelector(selectBusinesses);

  useEffect(() => {
    dispatch(searchBusinesses({ filter: null }));
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        newItemButton={{
          labelId: 'myBusiness.newBusiness',
          href: '/business/new'
        }}
      />
      <div className="grid-fill">
        {businesses.map((b) => (
          <BusinessCard key={b._id.toString()} business={b} />
        ))}
      </div>
    </div>
  );
};

export default MyBusinessPage;
