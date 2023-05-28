import { ChangeEvent } from 'react';

import { IUseInputProps } from './model/IUseInput.props';

const useInputProps = ({
  placeholder,
  type,
  value,
  step,
  onChange
}: Partial<IUseInputProps>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === 'number' ? parseFloat(event.target.value) : event.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return { placeholder, type, step, value, handleChange };
};

export { useInputProps };
