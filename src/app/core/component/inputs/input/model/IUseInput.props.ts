type IUseInputProps = {
  placeholder: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (value: string | number) => void;
  step?: number;
};

export type { IUseInputProps };
