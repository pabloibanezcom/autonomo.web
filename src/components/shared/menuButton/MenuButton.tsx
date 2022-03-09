import MenuItemEl from 'interfaces/MenuItemEl';
import {
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from 'material';
import React, { useState } from 'react';
import styles from './menuButton.module.scss';

type MenuButtonProps = {
  isIconButton?: boolean;
  rounded?: boolean;
  menuItems: MenuItemEl[];
  children: JSX.Element;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (event: any) => {
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
        size="large"
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
                  {menuItems.map((mItem, i) => (
                    <MenuItem
                      key={i}
                      onClick={(e) => handleClickAndClose(e, mItem)}
                    >
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
