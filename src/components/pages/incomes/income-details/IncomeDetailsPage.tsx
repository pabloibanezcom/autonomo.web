import { Income } from '@autonomo/common';
import { PageHeader } from 'components/shared';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIncome, selectIncome } from 'store';

const IncomeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const income: Income = useSelector(selectIncome);

  useEffect(() => {
    dispatch(getIncome({ id }));
  }, [dispatch, id]);

  const breadcrumbs = [
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'Incomes',
      href: '/incomes'
    },
    {
      text: 'Details'
    }
  ];

  return (
    <div>
      <PageHeader
        title={`Income #${income?.number}`}
        breadcrumbs={breadcrumbs}
      />
      <div>Income number: {income?.number}</div>
    </div>
  );
};

export default IncomeDetailsPage;
