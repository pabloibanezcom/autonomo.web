import { AuthLayout } from 'components/layout';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthRootPage = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default AuthRootPage;
