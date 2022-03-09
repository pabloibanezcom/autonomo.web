/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuButton } from 'components/shared';
import MenuItemEl from 'interfaces/MenuItemEl';
import { Typography } from 'material';
import { MoreVertIcon } from 'material/icons';
import React from 'react';
import styles from './panel.module.scss';

type PanelProps = {
  title?: string;
  toolBox?: any;
  menuItems?: MenuItemEl[];
  children?: any;
  zeroPadding?: boolean;
};

const Panel = ({
  title,
  toolBox,
  menuItems,
  children,
  zeroPadding
}: PanelProps) => {
  return (
    <div className={styles.panel}>
      {(title || menuItems) && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {title && (
              <Typography variant="h6" className={styles.title}>
                {title}
              </Typography>
            )}
          </div>
          <div className={styles.headerRight}>
            {toolBox && <div>{toolBox}</div>}
            {menuItems && (
              <MenuButton isIconButton menuItems={menuItems}>
                <MoreVertIcon />
              </MenuButton>
            )}
          </div>
        </div>
      )}
      <div
        className={[
          styles.content,
          zeroPadding ? styles['content--zeropadding'] : ''
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
};

export default Panel;
