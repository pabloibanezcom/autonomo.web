/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@autonomo/common';
import { LanguageSelector, MenuButton } from 'components/shared';
import { AppBar, Toolbar } from 'material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from 'store';
import styles from './top-bar.module.scss';

const Topbar = () => {
  const user: User = useSelector(selectUser);
  const navigate = useNavigate();

  const loggedInMenu = [
    {
      content: 'My profile',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => navigate('/my-profile')
    },
    {
      content: 'My business',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => navigate('/my-business')
    },
    {
      content: 'Logout',
      onClick: () => navigate('/auth/login')
    }
  ];

  return (
    <AppBar position="sticky" className={styles.topbar}>
      <Toolbar variant="dense">
        <div className={styles.leftContent} />
        <div className={styles.rightContent}>
          <LanguageSelector />
          <MenuButton isIconButton rounded menuItems={loggedInMenu}>
            <img
              src={user.picture}
              alt={user.firstName}
              className={styles.userIconImg}
            />
          </MenuButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
