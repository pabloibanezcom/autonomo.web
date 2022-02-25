import { LoginData } from '@autonomo/common';
import { removeAuthToken } from 'http/authToken';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectTokenExists } from 'store';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState<LoginData>(null);
  const tokenExists: boolean = useSelector(selectTokenExists);
  const navigate = useNavigate();

  useEffect(() => {
    removeAuthToken();
  }, []);

  useEffect(() => {
    if (tokenExists) {
      navigate('/');
    }
  }, [navigate, tokenExists]);

  const submitLogin = () => {
    dispatch(login({ loginData }));
  };

  const updateLoginData = (property: string, val: string) => {
    setLoginData((prevState) => ({
      ...prevState,
      [property]: val
    }));
  };

  return (
    <div>
      <form>
        <h3>Sign in</h3>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(val) => updateLoginData('email', val.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(val) => updateLoginData('password', val.target.value)}
        />
        <input type="button" value="Login" onClick={submitLogin} />
      </form>
    </div>
  );
};

export default LoginPage;
