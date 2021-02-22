import './Spinner.css';

import React, { useMemo } from 'react';

export const SIZE_ENUM = ['small', 'medium', 'large'];

const sizeMap = {
  small: {
    center: 10,
    dashArray: 56.5,
    radius: 9,
    strokeWidth: 2,
    widthHeight: 20,
  },
  medium: {
    center: 21,
    dashArray: 113,
    radius: 18,
    strokeWidth: 3,
    widthHeight: 42,
  },
  large: {
    center: 42,
    dashArray: 226,
    radius: 36,
    strokeWidth: 6,
    widthHeight: 84,
  },
};

export type SpinnerSizeTypes = 'small' | 'medium' | 'large';

export interface SpinnerProps {
  /**
   *Size of the Spinner
   */
  size?: SpinnerSizeTypes;
  /**
   * Progress is used in a the load progress case.
   * Default is -1 which internally defaults to using a indeterminate spinner.
   */
  progress?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size, progress }) => {
  const { center, dashArray, radius, strokeWidth, widthHeight } = sizeMap[size];

  const isProgress = Boolean(progress > 0);

  const offset = useMemo(() => {
    const internalProgress = isProgress ? progress : 25;
    return ((100 - internalProgress) / 100) * dashArray;
  }, [dashArray, isProgress, progress]);

  const classNames = useMemo(() => {
    const spinnerClassNames = ['spinner'];
    if (!isProgress) {
      spinnerClassNames.push('spinner-indeterminate');
    }
    return spinnerClassNames.join(' ');
  }, [isProgress]);

  const circleProps = {
    cx: center,
    cy: center,
    r: radius,
    fill: 'transparent',
    strokeDasharray: dashArray,
    strokeWidth,
  };

  return (
    <div className={classNames} data-testid={`${size}-${progress}`}>
      <svg className="spinner-inner" height={widthHeight} width={widthHeight}>
        <circle className="circle" {...circleProps} />
        <circle
          className="progress"
          {...circleProps}
          strokeDashoffset={offset}
        />
      </svg>
    </div>
  );
};

Spinner.defaultProps = {
  size: 'small',
  progress: -1,
};

export default Spinner;
