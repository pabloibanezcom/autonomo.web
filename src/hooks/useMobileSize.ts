/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaQuery } from 'material';
import { Theme } from 'material/interfaces';

const useMobileSize = () => {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
};

export default useMobileSize;
