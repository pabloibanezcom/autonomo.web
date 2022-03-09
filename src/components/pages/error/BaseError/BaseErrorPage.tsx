import { Button, Typography } from 'material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './base-error-page.module.scss';

type BaseErrorPageProps = {
  code: string;
  header: string;
  subheader: string;
};

const BaseErrorPage = ({ code, header, subheader }: BaseErrorPageProps) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Typography variant="h2" component="div">
          {code}
        </Typography>
        <Typography variant="h6" component="div">
          {header}
        </Typography>
        <Typography variant="subtitle2" component="div">
          {subheader}
        </Typography>
        <div>
          <Button component={Link} to="/">
            Return to website
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BaseErrorPage;
