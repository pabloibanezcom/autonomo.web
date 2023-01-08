import { IntlTypography } from 'components/shared';
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
import { useNavigate } from 'react-router-dom';
import { getIcon } from 'util/icon';
import styles from './menuButton.module.scss';

type MenuButtonProps = {
  isIconButton?: boolean;
  rounded?: boolean;
  size?: 'small' | 'medium' | 'large';
  menuMargin?: number;
  menuItems: MenuItemEl[];
  children: JSX.Element;
};

const MenuButton = ({
  isIconButton,
  rounded,
  size,
  menuMargin,
  menuItems,
  children
}: MenuButtonProps) => {
  const [isOpen, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

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
    if (menuItem.onClick) {
      menuItem.onClick();
    }
    if (menuItem.navigateTo) {
      navigate(menuItem.navigateTo);
    }
    handleClose(event);
  };

  const renderButton = (): JSX.Element => {
    return isIconButton ? (
      <IconButton
        ref={anchorRef}
        aria-controls={isOpen ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        size={size}
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

  const renderMenuElement = (mItem: MenuItemEl, index: number): JSX.Element => {
    const Icon = getIcon(mItem.icon);
    return (
      <MenuItem key={index} onClick={(e) => handleClickAndClose(e, mItem)}>
        {Icon && (
          <Icon color="primary" sx={{ fontSize: 14 }} className="me-2" />
        )}
        {mItem.id ? (
          <IntlTypography component="span" id={mItem.id} />
        ) : (
          mItem.content
        )}
      </MenuItem>
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
        sx={{
          marginTop: menuMargin ? `${menuMargin}px !important` : undefined
        }}
        className={styles.popper}
        transition
        disablePortal
        onResize={undefined}
        onResizeCapture={undefined}
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
                  {menuItems.map((mItem, i) => renderMenuElement(mItem, i))}
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
