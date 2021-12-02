/* eslint-disable @typescript-eslint/no-explicit-any */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useContext } from 'react';
import { UserContext } from '../../../../context/user';
import LanguageSelector from '../../../languageSelector/LanguageSelector';
import MenuButton from '../../../menuButton/MenuButton';
import styles from './top-bar.module.scss';

const Topbar = () => {
  const { user, login, logout } = useContext(UserContext);
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
              <img
                src={user.picture}
                alt={user.firstName}
                className={styles.userIconImg}
              />
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
