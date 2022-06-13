import { useMobileSize } from 'hooks';
import { Container } from 'material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPreferences, setNavbarCollapsed } from 'store';
import { generateNavbarElements } from 'util/routes';
import routeDefinitions from '../../../../routes.json';
import styles from './dashboard-layout.module.scss';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';
import Topbar from './topbar/Topbar';

interface DashboardLayoutProps {
  children: JSX.Element;
}

const navbarMenuItems = generateNavbarElements(routeDefinitions);

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const dispatch = useDispatch();
  const isMobile = useMobileSize();

  const [isCollapsed, setCollapsed] = useState<boolean>(
    useSelector(selectPreferences).navbarCollapsed
  );

  const handleToggleCollapsed = (): void => {
    setCollapsed((prevCollapsed) => {
      dispatch(setNavbarCollapsed(!prevCollapsed));
      return !prevCollapsed;
    });
  };

  return (
    <div className={styles.dashboard}>
      <Navbar
        menuItems={navbarMenuItems}
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        onToggleCollapsed={handleToggleCollapsed}
      />

      <div className={styles.rightContent}>
        <Topbar isMobile={isMobile} onToggleCollapsed={handleToggleCollapsed} />
        <div className={styles.containerWrapper}>
          <Container
            maxWidth="xl"
            className={
              !isMobile ? styles.containerDesktop : styles.containerMobile
            }
          >
            {children}
          </Container>
        </div>
        <Footer />
        {isMobile && !isCollapsed && (
          <div
            className={[
              styles.overlay,
              !isCollapsed ? styles.overlayActive : ''
            ].join(' ')}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
