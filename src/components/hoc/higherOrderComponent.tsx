/** @format */

import React from 'react';
import Sidebar from '../sidebar';
import Header from '../header';
import MobileSidebar from '../MobileSidebar';

// Define the types for the WrappedComponent and its props
type WrappedComponentType = React.ComponentType<any>; // You can provide a more specific type for your component
type PropsType = {};

function withSidebarAndHeader(WrappedComponent: WrappedComponentType) {
  const WithSidebarAndHeader = function (props: PropsType) {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
    return (
      <div className='flex bg-white text-black'>
        <div
          className={`${
            menuOpen ? 'md:w-[16%] w-[40%]' : 'hidden'
          } absolute top-0 left-0 `}>
          <MobileSidebar />
        </div>
        <div className='md:hidden absolute top-1 left-2'>
          <button
            onClick={toggleMenu}
            className='text-white text-4xl z-50'>
            ☰
          </button>
        </div>
        <div className='hidden md:block'>
          <Sidebar />
        </div>
        <div className='md:w-[84%] w-full'>
          <Header />
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };

  WithSidebarAndHeader.displayName = `WithSidebarAndHeader(${getDisplayName(
    WrappedComponent
  )})`;

  return WithSidebarAndHeader;
}

function getDisplayName(WrappedComponent: WrappedComponentType): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withSidebarAndHeader;
