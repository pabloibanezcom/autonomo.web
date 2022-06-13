import { Business } from '@autonomo/common';
import { BusinessCard, PageHeader } from 'components/shared';
import { PageProps } from 'interfaces';
import { Box, Grid } from 'material';
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
      <Box>
        <Grid container spacing={4}>
          {businesses.map((b) => (
            <Grid key={b._id.toString()} item xs={12} sm={6} md={4}>
              <BusinessCard business={b} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default MyBusinessPage;
