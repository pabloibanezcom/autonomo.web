/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth0Client, Auth0ClientOptions } from '@auth0/auth0-spa-js';
import { Auth0User } from '@autonomo/common';
import React, { createContext, useEffect, useState } from 'react';
import api from '../http';
import { getAuthToken, removeAuthToken, setAuthToken } from '../http/authToken';

const configureAuth0Client = (): Auth0Client => {
  const auth0Config: Auth0ClientOptions = {
    domain: 'pabloiveron.eu.auth0.com',
    client_id: 'wYDowi6VclQR3DaNLIrypxYtkI8WMVB1',
    audience: 'autonomo'
  };
  return new Auth0Client(auth0Config);
};

type UserContextType = {
  user: Auth0User | null;
  login: () => Promise<void>;
  handleRedirectCallback: () => Promise<void>;
  logout: () => void;
};

type userProviderProps = {
  children: any;
};

export const UserContext = createContext({} as UserContextType);

const UserProvider = ({ children }: userProviderProps) => {
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();
  const [user, setUser] = useState(null);
  const [isTokenLoaded, setTokenLoaded] = useState(false);

  // To avoid creating a new instance of the client on each render
  if (!auth0Client) {
    setAuth0Client(configureAuth0Client());
  }

  const login = async (): Promise<void> => {
    await auth0Client?.loginWithRedirect({
      redirect_uri: `${window.location.origin}/auth`
    });
  };

  const handleRedirectCallback = async (): Promise<void> => {
    if (window.location.href.split('?').slice(1).length) {
      await auth0Client?.handleRedirectCallback();
      await getAccessToken();
    }
  };

  const logout = (): void => {
    auth0Client?.logout();
    removeAuthToken();
    login();
  };

  const getAccessToken = async (): Promise<void> => {
    const token = await auth0Client?.getTokenSilently();
    if (token) {
      setAuthToken(token);
      setTokenLoaded(true);
    }
  };

  const getUser = async (): Promise<void> => {
    api.user
      .getUser()
      .then((res) => setUser(res.data))
      .catch(() => {
        login();
      });
  };

  useEffect(() => {
    const getUserOnLoad = async () => {
      if (!user && getAuthToken()) {
        await getUser();
      }
    };

    getUserOnLoad();
  }, []);

  useEffect(() => {
    if (isTokenLoaded) {
      getUser();
    }
  }, [isTokenLoaded]);

  return (
    <UserContext.Provider
      value={{ user, login, handleRedirectCallback, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
