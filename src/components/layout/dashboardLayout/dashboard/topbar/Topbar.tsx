/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@autonomo/common';
import { LanguageSelector, MenuButton, SearchBar } from 'components/shared';
import { useScroll } from 'hooks';
import { AppBar, Container, IconButton, Toolbar } from 'material';
import { AddIcon, MenuIcon, NotificationsIcon } from 'material/icons';
import { useSelector } from 'react-redux';
import { selectUser } from 'store';
import addMenuItems from './addMenuItems.json';
import loggedInMenuItems from './loggedInMenuItems.json';
import styles from './top-bar.module.scss';

type TopbarProps = {
  isMobile: boolean;
  onToggleCollapsed: () => void;
};

const Topbar = ({ isMobile, onToggleCollapsed }: TopbarProps) => {
  const user: User = useSelector(selectUser);
  const isScroll = useScroll({
    target: 0
  });

  console.log(user.person);

  return (
    <AppBar
      position="sticky"
      className={styles.topbar}
      sx={!isScroll ? { boxShadow: 'none' } : undefined}
    >
      <Container maxWidth="xl">
        <Toolbar variant="dense">
          <div className={styles.leftContent}>
            {isMobile && (
              <IconButton
                className="p-0"
                aria-label="menu"
                onClick={onToggleCollapsed}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
          </div>
          <div className={styles.rightContent}>
            {!isMobile && (
              <>
                <div>
                  <MenuButton
                    isIconButton
                    rounded
                    menuMargin={20}
                    menuItems={addMenuItems}
                  >
                    <AddIcon />
                  </MenuButton>
                </div>
                <div>
                  <SearchBar />
                </div>
                <div>
                  <IconButton aria-label="notification">
                    <NotificationsIcon />
                  </IconButton>
                </div>
              </>
            )}
            <LanguageSelector />
            <MenuButton
              isIconButton
              rounded
              menuMargin={20}
              menuItems={loggedInMenuItems}
            >
              <div>PI</div>
            </MenuButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Topbar;
