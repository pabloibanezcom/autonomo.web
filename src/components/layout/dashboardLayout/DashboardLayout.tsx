/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from '@material-ui/core/Container';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React from 'react';
import styles from './dashboard-layout.module.scss';
import Navbar from './navbar/Navbar';
import Topbar from './topbar/Topbar';

type DashboardLayoutProps = {
  children: any;
};

const navbarMenuItems = [
  {
    icon: HomeIcon,
    text: 'Home',
    href: '/home'
  },
  {
    icon: DescriptionIcon,
    text: 'Invoices',
    href: '/invoices'
  },
  {
    icon: PeopleAltIcon,
    text: 'Clients',
    href: '/clients'
  }
];

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
