import { useRef, useState } from 'react';
import { useClickOutside } from '@shared/lib/hooks/use-click-outside';

/**
 * Option
 */
type Option = {
  title: string;
  option: string;
};

/**
 * Dropdown Props
 */
type DropdownProps = {
  /**
   * Classname
   */
  className?: string;
  /**
   * Label
   */
  label: string;
  /**
   * Select Label
   */
  selectLabel: string;
  /**
   * Select Label Func
   */
  toggleSelectLabel: () => void;
  /**
   * Select param
   */
  handleSortParam: (param: string) => void;
  /**
   * Options
   */
  options: Option[];
  /**
   * Color
   */
  color?: 'white' | 'black';
};

/**
 * Use Dropdown
 */
const useDropdown = (props: DropdownProps) => {
  const [selectLabel, setSelectLabel] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showOptions, setShowOptions] = useState(false);

  const toggleShowElements = () => {
    setShowOptions(!showOptions);
  };

  const toggleSelectLabel = (selectTitle: string) => {
    setSelectLabel(selectTitle);
  };

  useClickOutside(dropdownRef, () => {
    if (showOptions) toggleShowElements();
  });

  return {
    selectLabel,
    toggleSelectLabel,
    showOptions,
    toggleShowElements
  };
};

export { useDropdown };
export type { DropdownProps };
