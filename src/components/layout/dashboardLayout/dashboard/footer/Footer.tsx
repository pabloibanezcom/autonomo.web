import { IntlTypography } from 'components/shared';
import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <IntlTypography id="footer.text" />
      </div>
    </div>
  );
};

export default Footer;
