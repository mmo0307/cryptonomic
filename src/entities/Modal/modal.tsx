import React, { Dispatch, SetStateAction } from 'react';

import './modal.scss';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface Props {
  active: boolean;
  setActive: Dispatcher<boolean>;
  children: any;
}

export const Modal = ({ active, setActive, children }: Props) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={e => e.stopPropagation()}
    >
      <div className={active ? 'modal_content active' : 'modal_content'}>
        <div className='modal_content_header'>
          <div>
            <p className='modal_content_title'>Description</p>
          </div>
          <div>
            <span onClick={() => setActive(false)}>X</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
