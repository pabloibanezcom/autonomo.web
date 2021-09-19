import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout/DashboardLayout';
import { dashboardRoutes } from '../../routes';

const RootContainer = () => {
  return <DashboardLayout>{dashboardRoutes()}</DashboardLayout>;
};

export default RootContainer;
