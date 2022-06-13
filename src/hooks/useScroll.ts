/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

type UseScrollProps = {
  target: number;
};

const useScroll = ({ target }: UseScrollProps) => {
  const [isBelow, setIsBelow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (event: any) => {
      if (event.target.scrollTop > target !== isBelow) {
        setIsBelow(event.target.scrollTop > target);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isBelow, target]);

  return isBelow;
};

export default useScroll;
