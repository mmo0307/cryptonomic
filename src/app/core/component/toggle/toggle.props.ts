import { useState } from 'react';

type ToggleProps = {
  number: string;
  title: string;
  text: string;
};

const useToggle = (props: Partial<ToggleProps>) => {
  const { number, title, text } = props;

  const [active, setActive] = useState<boolean>(false);

  return {
    active,
    setActive,
    number,
    title,
    text
  };
};

export { useToggle };
