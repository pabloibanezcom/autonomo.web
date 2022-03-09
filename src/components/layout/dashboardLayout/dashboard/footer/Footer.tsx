import { Typography } from 'material';
import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <Typography>2022 - Designed and developed by Pablo Ibanez</Typography>
      </div>
    </div>
  );
};

export default Footer;
