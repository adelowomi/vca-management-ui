import Popper from 'popper.js';
import React from 'react';

const Dropdown = ({ color }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef<any>();
  const popoverDropdownRef = React.createRef<any>();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === 'white'
    ? (bgColor = 'bg-indigo-500')
    : (bgColor = 'bg-' + color + '-500');
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={
                'text-white font-  text-lg px-6 py-2 flex rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ' +
                bgColor
              }
              style={{ transition: 'all .15s ease' }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {color === 'white' ? 'Save and Publish' : color + ' Dropdown'}
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? 'block ' : 'hidden ') +
                (color === 'white' ? 'bg-white ' : bgColor + ' ') +
                'text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1'
              }
              style={{ minWidth: '12rem' }}
            >
              {/* Drop down content */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
