import { Breadcrumbs, Divider, Link, Typography } from 'material';
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
  rightContent?: JSX.Element;
};

const PageHeader = ({ title, breadcrumbs, rightContent }: PageHeaderProps) => {
  const renderBreadcrumbEl = (bEl: BreadcrumbsEl, i: number) => {
    return bEl.href ? (
      <Link key={i} component={RouterLink} color="inherit" to={bEl.href}>
        {bEl.text}
      </Link>
    ) : (
      <Typography key={i} color="textPrimary">
        {bEl.text}
      </Typography>
    );
  };

  return (
    <div>
      <div className={styles.container}>
        <div>
          <Typography variant="h3" className={styles.title}>
            {title}
          </Typography>
          {breadcrumbs && (
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs.map((bEl, i) => renderBreadcrumbEl(bEl, i))}
            </Breadcrumbs>
          )}
        </div>
        {rightContent && <div>{rightContent}</div>}
      </div>
      <Divider className={styles.divider} />
    </div>
  );
};

export default PageHeader;
