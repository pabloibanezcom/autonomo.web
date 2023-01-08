import { Business, User } from '@autonomo/common';
import { DashboardLayout } from 'components/layout';
import { getAuthToken } from 'http/authToken';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  getBusiness,
  getBusinessTaxYear,
  getUser,
  selectBusiness,
  selectUser
} from 'store';

const RootPage = () => {
  const user: User = useSelector(selectUser);
  const business: Business = useSelector(selectBusiness);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken()) {
      // navigate('/auth/login');
    } else if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (user?.defaultBusiness && !business) {
      const localStorageBusiness = localStorage.getItem('business');
      dispatch(
        getBusiness({
          id: localStorageBusiness || user.defaultBusiness.toString()
        })
      );
    }
    if (business) {
      dispatch(getBusinessTaxYear({ businessId: business._id.toString() }));
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
