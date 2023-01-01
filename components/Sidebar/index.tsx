import clsx from 'clsx';
import React from 'react';
import UserCard from './UserCard'

interface Props {
  username: string;
  email: string;
  children: React.ReactElement | React.ReactElement[];
  isVisible?: boolean;
}

const Sidebar: React.FC<Props> = ({ username, email, children, isVisible}: Props) => {
  return (
    <div className={clsx("fixed top-14 left-0 bottom-0 bg-primary-main sm:rounded-br-quarter transition-all",
      {
        "w-full sm:w-2/4 md:w-4/12 lg:w-1/5": isVisible === true,
      },
      {
        "w-0": isVisible === false,
      })}>
      <div className={clsx('flex flex-col w-full justify-start items-center py-6 transition-all',
        {
          'visible': isVisible === true,
        },
        {
          'hidden': isVisible === false,
        })}>
        <UserCard email={email} username={username} />
        <div className='py-6 w-full flex flex-col justify-center items-end'>
          {children}
        </div>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  isVisible: false,
}

export default Sidebar;
