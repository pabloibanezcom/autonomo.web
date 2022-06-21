import { MenuButton } from 'components/shared';
import MenuItemEl from 'interfaces/MenuItemEl';
import { Avatar, Card, CardActions, CardContent, CardHeader } from 'material';
import { MoreVertIcon } from 'material/icons';

type BaseCardProps = {
  avatar: string;
  color?: string;
  picture?: string;
  title: string;
  subheader?: JSX.Element;
  content?: JSX.Element;
  menuItems?: MenuItemEl[];
  actions?: JSX.Element;
};

const BaseCard = ({
  avatar,
  color,
  picture,
  title,
  subheader,
  content,
  menuItems,
  actions
}: BaseCardProps) => {
  const avatarEl = (
    <Avatar variant="rounded" sx={{ bgcolor: color }} src={picture}>
      {avatar.slice(0, 2).toUpperCase()}
    </Avatar>
  );

  const titleEl = <span className="fw-bold">{title}</span>;

  return (
    <Card>
      <CardHeader
        avatar={avatarEl}
        action={
          menuItems && (
            <MenuButton isIconButton menuItems={menuItems}>
              <MoreVertIcon />
            </MenuButton>
          )
        }
        title={titleEl}
        subheader={subheader}
      />
      {content && <CardContent>{content}</CardContent>}
      <CardActions className="d-flex flex-row-reverse">{actions}</CardActions>
    </Card>
  );
};

export default BaseCard;
