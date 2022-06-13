import { Avatar as MaterialAvatar } from 'material';

type AvatarElement = {
  color?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
};

type AvatarProps = {
  element: AvatarElement;
};

const renderTwoLetters = (element: AvatarElement): string => {
  return (
    element.name?.substring(0, 2) ||
    `${element.firstName?.substring(0, 1)}${element.lastName?.substring(0, 1)}`
  ).toUpperCase();
};

const Avatar = ({ element }: AvatarProps) => (
  <MaterialAvatar
    sx={{
      width: 22,
      height: 22,
      fontSize: 11,
      backgroundColor: element.color
    }}
  >
    {renderTwoLetters(element)}
  </MaterialAvatar>
);

export default Avatar;
