import clsx from "clsx";
import React from "react";
import Portion from "./Portion";

interface Props {
    size?: 'sm' | 'md' | 'lg'
}

const PieChart: React.FC<Props> = ({size}: Props) => {
  return (
    <div className={clsx('bg-slate-500 rounded-full after:inline-block after:w-1/2 after:h-1/2 after:bg-slate-50 after:rounded-full after:relative after:top-1/4 after:inset-1/4 after:cursor-default hover:cursor-pointer shadow-md',
      {
        'w-64 h-64': size === 'lg',
        'w-48 h-48': size === 'md',
        'w-28 h-28': size === 'sm',
      }
    )}>
      <Portion/>
    </div>
  );
}

PieChart.defaultProps = {
    size: 'lg',
}

export default PieChart;