import { useState } from 'react';

type ToggleProps = {
  number: string;
  title: string;
  text: string;
};

const useToggle = (props: ToggleProps) => {
  const [active, setActive] = useState<boolean>(false);

  return {
    active,
    setActive
  };
};

export { useToggle };
