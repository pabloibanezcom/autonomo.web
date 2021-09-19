import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './pageHeader.module.scss';

type BreadcrumbsEl = {
  text: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  breadcrumbs?: BreadcrumbsEl[];
};

const PageHeader = ({ title, breadcrumbs }: PageHeaderProps) => {
  const renderBreadcrumbEl = (bEl: BreadcrumbsEl) => {
    return bEl.href ? (
      <Link key={bEl.text} component={RouterLink} color="inherit" to={bEl.href}>
        {bEl.text}
      </Link>
    ) : (
      <Typography key={bEl.text} color="textPrimary">
        {bEl.text}
      </Typography>
    );
  };

  return (
    <div>
      <Typography variant="h3" className={styles.title}>
        {title}
      </Typography>
      {breadcrumbs && (
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((bEl) => renderBreadcrumbEl(bEl))}
        </Breadcrumbs>
      )}
      <Divider className={styles.divider} />
    </div>
  );
};

export default PageHeader;
