import { IntlTypography } from 'components/shared';
import { useMobileSize } from 'hooks';
import { Breadcrumbs, Button, Divider, Fab, Link, Typography } from 'material';
import { AddIcon } from 'material/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styles from './pageHeader.module.scss';

type BreadcrumbsEl = {
  text: string;
  href?: string;
};

type NewItemButton = {
  labelId: string;
  href: string;
};

type PageHeaderProps = {
  title: string;
  breadcrumbs?: BreadcrumbsEl[];
  newItemButton?: NewItemButton;
};

const renderNewItemButton = (newItem: NewItemButton) => (
  <Button
    size="small"
    startIcon={<AddIcon />}
    component={RouterLink}
    to={newItem.href}
  >
    <IntlTypography id={newItem.labelId} />
  </Button>
);

const PageHeader = ({ title, breadcrumbs, newItemButton }: PageHeaderProps) => {
  const isMobile = useMobileSize();
  const navigate = useNavigate();

  const handleFabClick = () => {
    navigate(newItemButton.href);
  };

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
        {newItemButton && (
          <div>
            {!isMobile ? (
              renderNewItemButton(newItemButton)
            ) : (
              <Fab
                color="primary"
                className={styles.fabButton}
                onClick={handleFabClick}
              >
                <AddIcon />
              </Fab>
            )}
          </div>
        )}
      </div>
      <Divider className={styles.divider} />
    </div>
  );
};

export default PageHeader;
