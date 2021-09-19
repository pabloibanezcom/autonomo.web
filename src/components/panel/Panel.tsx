/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { MenuItemEl } from '../../models';
import MenuButton from '../menuButton/MenuButton';
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
