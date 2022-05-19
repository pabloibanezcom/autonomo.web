import { NavbarEl } from 'interfaces';
import { Button, Tooltip, Typography } from 'material';
import { ArrowBackIosIcon, DashboardIcon } from 'material/icons';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getIcon } from 'util/icon';
import styles from './navbar.module.scss';

type NavbarProps = {
  menuItems: NavbarEl[];
  isMobile: boolean;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
};

const Navbar = ({
  menuItems,
  isMobile,
  isCollapsed,
  onToggleCollapsed
}: NavbarProps) => {
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

  const responsiveNavbar = isMobile
    ? styles.navbarMobile
    : styles.navbarDesktop;

  const responsiveNavbarCollapsed = isMobile
    ? styles.navbarCollapsedMobile
    : styles.navbarCollapsedDesktop;

  const renderContent = (
    <>
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
          onClick={onToggleCollapsed}
        >
          <ArrowBackIosIcon />
        </Button>
      </div>
    </>
  );

  const renderNavbar = (
    <div
      className={[
        responsiveNavbar,
        isCollapsed && responsiveNavbarCollapsed
      ].join(' ')}
    >
      {isMobile ? (
        <div
          className={
            isCollapsed
              ? styles.navbarContentCollapsed
              : styles.navbarContentExpanded
          }
        >
          {renderContent}
        </div>
      ) : (
        <>{renderContent}</>
      )}
    </div>
  );

  return <>{renderNavbar}</>;
};

export default Navbar;
