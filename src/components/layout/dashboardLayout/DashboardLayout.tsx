/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from '@mui/material/Container';
import React from 'react';
import { generateNavbarElements } from 'util/routes';
import routeDefinitions from '../../../routes.json';
import styles from './dashboard-layout.module.scss';
import Navbar from './navbar/Navbar';
import Topbar from './topbar/Topbar';

interface DashboardLayoutProps {
  children: any;
}

const navbarMenuItems = generateNavbarElements(routeDefinitions);

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={styles.dashboard}>
      <Navbar menuItems={navbarMenuItems} />
      <div className={styles.rightContent}>
        <Topbar />
        <div className={styles.containerWrapper}>
          <Container maxWidth="xl" className={styles.container}>
            {children}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
