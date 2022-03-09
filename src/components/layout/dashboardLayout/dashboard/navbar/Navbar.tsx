import { NavbarEl } from 'interfaces';
import { Button, Tooltip, Typography } from 'material';
import { ArrowBackIosIcon, DashboardIcon } from 'material/icons';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectPreferences, setNavbarCollapsed } from 'store';
import { getIcon } from 'util/icon';
import styles from './navbar.module.scss';

type NavbarProps = {
  menuItems: NavbarEl[];
};

const Navbar = ({ menuItems }: NavbarProps) => {
  const dispatch = useDispatch();
  const [isCollapsed, setCollapsed] = useState(
    useSelector(selectPreferences).navbarCollapsed
  );

  const handleToggle = (): void => {
    setCollapsed((prevCollapsed) => {
      dispatch(setNavbarCollapsed(!prevCollapsed));
      return !prevCollapsed;
    });
  };

  const renderMenuItem = (menuItem: NavbarEl) => {
    const Icon = getIcon(menuItem.icon);
    const renderItemButton = () => {
      return (
        <Button
          component={Link}
          variant="text"
          fullWidth
          className={styles.menuItemButton}
          to={menuItem.href}
        >
          <div
            className={[
              styles.navBarElement,
              styles.menuItemButtonContent
            ].join(' ')}
          >
            <Icon className={styles.icon} />
            {!isCollapsed && (
              <span className={styles.title}>{menuItem.text}</span>
            )}
          </div>
        </Button>
      );
    };

    return isCollapsed ? (
      <Tooltip title={menuItem.text} placement="right">
        {renderItemButton()}
      </Tooltip>
    ) : (
      renderItemButton()
    );
  };

  return (
    <div
      className={[styles.navbar, isCollapsed && styles.navbarCollapsed].join(
        ' '
      )}
    >
      <div className={styles.topSection}>
        <div className={styles.navBarElement}>
          <DashboardIcon />
          {!isCollapsed && (
            <Typography variant="h6" className={styles.title}>
              Autonomo
            </Typography>
          )}
        </div>
      </div>
      <div className={styles.mainSection}>
        {menuItems.map((mItem) => (
          <Fragment key={mItem.text}>{renderMenuItem(mItem)}</Fragment>
        ))}
      </div>
      <div className={styles.bottomSection}>
        <Button
          variant="text"
          fullWidth
          className={styles.arrowBottomButton}
          onClick={handleToggle}
        >
          <ArrowBackIosIcon />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
