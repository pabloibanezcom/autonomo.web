import { Business, User } from '@autonomo/common';
import DashboardLayout from 'components/layout/dashboardLayout/DashboardLayout';
import { getAuthToken } from 'http/authToken';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getBusiness, getUser, selectBusiness, selectUser } from 'store';

const RootPage = () => {
  const user: User = useSelector(selectUser);
  const business: Business = useSelector(selectBusiness);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/auth/login');
    } else if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (user?.defaultBusiness && !business) {
      dispatch(getBusiness({ id: user.defaultBusiness.toString() }));
    }
  }, [business, dispatch, user]);

  return (
    user &&
    business && (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    )
  );
};

export default RootPage;
