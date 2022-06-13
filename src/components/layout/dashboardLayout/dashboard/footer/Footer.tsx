import { IntlTypography } from 'components/shared';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <IntlTypography
          component="span"
          id="footer.text"
          values={{ year: new Date().getFullYear() }}
        />
      </div>
    </div>
  );
};

export default Footer;
