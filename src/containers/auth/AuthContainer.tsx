import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/user';

const AuthContainer = () => {
  const [isRedirectCallbackCompleted, setRedirectCallbackCompleted] =
    useState(false);
  const { handleRedirectCallback } = useContext(UserContext);

  useEffect(() => {
    const doRedirectCallback = async () => {
      await handleRedirectCallback();
      setRedirectCallbackCompleted(true);
    };

    doRedirectCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isRedirectCallbackCompleted ? <Redirect to="/" /> : <div />;
};

export default AuthContainer;
