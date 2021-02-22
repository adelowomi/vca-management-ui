import React, { useMemo } from 'react';

import mergeClassNames from '../../helpers/mergeClassNames';
import { User } from '../AssetsSVG';

const FONT_SIZE_LIMIT = {
  lower: 18,
  upper: 24,
};

interface AvatarProp {
  /**
   * To provide custom styles.
   */
  className?: string;
  /**
   * Adds first name which would be used to generate initials.
   */
  firstName?: string;
  /**
   * Would render initials if set to true. Default is true.
   */
  hasInitials?: boolean;
  /**
   * Adds last name which would be used to generate initials.
   */
  lastName?: string;
  /**
   * Set the size of the icon. Default is 18.
   */
  size?: number;
}

const Avatar: React.FC<AvatarProp> = ({
  className,
  firstName,
  hasInitials,
  lastName,
  size,
}) => {
  /** Generates initials based on the first letters of the name and surname
   */
  const initials = useMemo(() => {
    if (!firstName || !lastName) {
      return null;
    }

    const firstNameInitial = firstName.charAt(0);
    const lastNameInitial = lastName.charAt(0);

    return size < FONT_SIZE_LIMIT.upper
      ? firstNameInitial
      : `${firstNameInitial}${lastNameInitial}`;
  }, [firstName, lastName, size]);

  /** Returns width and height of the avatar's container */
  const containerStyle = useMemo(
    () => ({
      height: size,
      width: size,
    }),
    [size]
  );

  /** Returns styles for initials */
  const initialsStyles = useMemo(
    () => ({
      lineHeight: `${size}px`,
      fontSize: `${size >= FONT_SIZE_LIMIT.upper ? size / 3 : size / 2}px`,
    }),
    [size]
  );

  /** Returns boolean value determining if initials should be displayed
   * @returns {boolean}
   */
  const shouldDisplayInitials = useMemo(
    () => hasInitials && size > FONT_SIZE_LIMIT.lower,
    [hasInitials, size]
  );

  const renderedInitials = useMemo(
    () =>
      shouldDisplayInitials && (
        <span
          className={`absolute top-0 left-0 w-full h-full text-center app-white ${initialsStyles}`}
          data-testid="initials-test"
          style={initialsStyles}
        >
          {initials}
        </span>
      ),
    [initials, initialsStyles, shouldDisplayInitials]
  );

  return (
    <div
      className={mergeClassNames('relative', className)}
      style={containerStyle}
      data-testid="avatar-test"
    >
      <User size={size} className="app-avatar-icon" />
      {renderedInitials}
    </div>
  );
};

Avatar.defaultProps = {
  className: '',
  firstName: '',
  hasInitials: true,
  lastName: '',
  size: FONT_SIZE_LIMIT.lower,
};

export default Avatar;
