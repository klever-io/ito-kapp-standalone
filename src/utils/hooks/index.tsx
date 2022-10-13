/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useRef, useState } from 'react';

export const useDidUpdateEffect = (fn: Function, inputs: Array<any>): void => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
};

export const useIsElementVisible = (el: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const callback = ([entry]: any) => {
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const watch = new IntersectionObserver(callback);
    if (el) {
      watch.observe(el);
      return () => watch.unobserve(el);
    }
  }, [el]);

  return isVisible && !!el;
};
