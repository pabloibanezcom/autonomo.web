/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@autonomo/common';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../../../context/user';
import { getBusiness } from '../../../../store/business/businessSlice';
import { getUser, selectUser } from '../../../../store/user/userSlice';
import LanguageSelector from '../../../languageSelector/LanguageSelector';
import MenuButton from '../../../menuButton/MenuButton';
import styles from './top-bar.module.scss';

const Topbar = () => {
  const user: User = useSelector(selectUser);
  const dispatch = useDispatch();
  const { login, logout } = useContext(UserContext);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.defaultBusiness) {
      dispatch(getBusiness({ id: user.defaultBusiness.toString() }));
    }
  }, [dispatch, user]);

  const notLoggedInMenu = [
    {
      content: 'Login',
      onClick: login
    }
  ];

  const loggedInMenu = [
    {
      content: 'My profile',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {}
    },
    {
      content: 'Logout',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: logout
    }
  ];

  return (
    <AppBar position="static" className={styles.topbar}>
      <Toolbar variant="dense">
        <div className={styles.leftContent} />
        <div className={styles.rightContent}>
          <LanguageSelector />
          <MenuButton
            isIconButton
            rounded
            menuItems={user ? loggedInMenu : notLoggedInMenu}
          >
            {user ? (
              <>
                <img
                  src={user.picture}
                  alt={user.firstName}
                  className={styles.userIconImg}
                />
              </>
            ) : (
              <AccountCircleIcon />
            )}
          </MenuButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
