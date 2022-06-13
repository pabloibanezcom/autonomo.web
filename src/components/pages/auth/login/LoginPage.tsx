/* eslint-disable jsx-a11y/label-has-associated-control */
import { SerializedError } from '@reduxjs/toolkit';
import { Form } from 'components/shared';
import { removeAuthToken } from 'http/authToken';
import { Box, Typography } from 'material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectError } from 'store';
import formDefinition from './login.form.json';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const error: SerializedError = useSelector(selectError);

  useEffect(() => {
    removeAuthToken();
  }, []);

  const submitLogin = (data: Inputs) => {
    dispatch(login({ loginData: data }));
  };

  return (
    <div>
      <Typography variant="h3" align="center" mb={4}>
        Sign in
      </Typography>
      <Box>
        <Form
          formDefinition={formDefinition}
          error={error?.code === '401' && 'Incorrect email and password'}
          onSubmit={submitLogin}
        />
      </Box>
    </div>
  );
};

export default LoginPage;
