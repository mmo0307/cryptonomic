import React from 'react';

export const Triangle = ({ color = '#FF0000' }: { color?: string }) => {
  return (
    <svg
      width='10'
      height='9'
      viewBox='0 0 10 9'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5 9L0.669872 0.75L9.33013 0.75L5 9Z' />
    </svg>
  );
};
