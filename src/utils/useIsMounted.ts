/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useEffect, MutableRefObject } from 'react';

const useIsMounted = (): MutableRefObject<boolean> => {
  const isMounted = useRef<boolean>(false);

  // @ts-ignore
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted;
};

export default useIsMounted;
