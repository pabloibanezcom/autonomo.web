/* eslint-disable no-console */
import { IconButton } from 'material';
import { InfoIcon } from 'material/icons';

type ObjectContentInfoProps = {
  obj: unknown;
};

const ObjectContentInfo = ({ obj }: ObjectContentInfoProps) => {
  return (
    <IconButton onClick={() => console.log(obj)}>
      <InfoIcon />
    </IconButton>
  );
};

export default ObjectContentInfo;
