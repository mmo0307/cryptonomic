import { useEffect, useState } from 'react';

type TypeTextProps = {
  children: any;
};

const useTypeText = (props: Partial<TypeTextProps>) => {
  const { children } = props;

  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCharIndex(currentCharIndex => currentCharIndex + 1);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return {
    currentCharIndex,
    children
  };
};

export { useTypeText };
