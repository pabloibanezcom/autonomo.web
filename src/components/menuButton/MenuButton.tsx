/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React, { useState } from 'react';
import { MenuItemEl } from '../../models';
import styles from './menuButton.module.scss';

type MenuButtonProps = {
  isIconButton?: boolean;
  rounded?: boolean;
  menuItems: MenuItemEl[];
  children: any;
};

const MenuButton = ({
  isIconButton,
  rounded,
  menuItems,
  children
}: MenuButtonProps) => {
  const [isOpen, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleClickAndClose = (
    event: React.MouseEvent<EventTarget>,
    menuItem: MenuItemEl
  ) => {
    menuItem.onClick();
    handleClose(event);
  };

  const renderButton = () => {
    return isIconButton ? (
      <IconButton
        ref={anchorRef}
        aria-controls={isOpen ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        className={[
          styles.button,
          rounded ? styles['button--rounded'] : ''
        ].join(' ')}
        onClick={handleToggle}
      >
        {children}
      </IconButton>
    ) : (
      <Button
        ref={anchorRef}
        aria-controls={isOpen ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        className={styles.button}
        onClick={handleToggle}
      >
        {children}
      </Button>
    );
  };

  return (
    <div>
      {renderButton()}
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        className={styles.popper}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'right bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={isOpen}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {menuItems.map((mItem) => (
                    <MenuItem onClick={(e) => handleClickAndClose(e, mItem)}>
                      {mItem.content}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default MenuButton;
