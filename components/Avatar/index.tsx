/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import React from 'react';

interface Props {
  imageUrl: string;
  dimen?: 'xs' | 'sm' | 'md' | 'xl';
  user?: string;
  onClick?: () => void;
}

const Avatar: React.FC<Props> = ({ imageUrl, dimen, user, onClick }: Props) => (
  <img
    src={imageUrl}
    alt={user}
    title={user}
    className={clsx(
      'rounded-full object-cover object-center hover:cursor-pointer',
      {
        'w-8 h-8': dimen === 'xs',
      },
      {
        'w-12 h-12': dimen === 'sm',
      },
      {
        'w-16 h-16': dimen === 'md',
      },
      {
        'w-20 h-20': dimen === 'xl',
      },
    )}
    onClick={onClick}
  />
);

Avatar.defaultProps = {
  dimen: 'xs',
  user: 'you',
};

export default Avatar;