/* eslint-disable @typescript-eslint/no-explicit-any */
import { Business } from '@autonomo/common';
import { CountryLabel, IntlTypography } from 'components/shared';
import { NavbarEl } from 'interfaces';
import { Button, Tooltip, Typography } from 'material';
import { ArrowForwardIosIcon, BusinessIcon, PersonIcon } from 'material/icons';
import { Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectBusiness } from 'store';
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
  const ref = useRef<any>();
  const business: Business = useSelector(selectBusiness);

  const businessInfo = (businessToDisplay: Business) => {
    const TypeIcon =
      businessToDisplay.type === 'company' ? BusinessIcon : PersonIcon;

    return (
      <div className={isMobile ? styles.businessInfoMobile : ''}>
        <div>
          <Typography variant="h6" className="fw-bold text-nowrap">
            {businessToDisplay.name}
          </Typography>
        </div>
        <div className="d-flex flex-row mt-1">
          <div className="me-1 me-2 d-flex flex-row align-items-center">
            <TypeIcon fontSize="small" color="primary" className="me-1" />
            <IntlTypography
              component="span"
              className="text-nowrap"
              id={`businessType.${businessToDisplay.type}`}
            />
          </div>{' '}
          |{' '}
          <div className="text-nowrap ms-2 me-2">
            <CountryLabel code={businessToDisplay.country} flag />
          </div>{' '}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (!isCollapsed && ref.current && !ref.current.contains(e.target)) {
        onToggleCollapsed();
      }
    };

    if (isMobile) {
      document.addEventListener('mousedown', checkIfClickedOutside);
    }

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, onToggleCollapsed]);

  const handleLinkClicked = () => {
    if (isMobile) {
      onToggleCollapsed();
    }
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
          onClick={handleLinkClicked}
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
        <div className={styles.topSectionInner}>
          {isCollapsed ? (
            <PersonIcon color="primary" sx={{ fontSize: 28 }} />
          ) : (
            businessInfo(business)
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
          <ArrowForwardIosIcon
            className={
              isCollapsed ? styles.arrowIconRight : styles.arrowIconLeft
            }
          />
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

  return <div ref={ref}>{renderNavbar}</div>;
};

export default Navbar;
