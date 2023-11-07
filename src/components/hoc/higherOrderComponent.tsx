/** @format */

import React from 'react';
import Sidebar from '../sidebar';
import Header from '../header';

// Define the types for the WrappedComponent and its props
type WrappedComponentType = React.ComponentType<any>; // You can provide a more specific type for your component
type PropsType = {};

function withSidebarAndHeader(WrappedComponent: WrappedComponentType) {
  return function (props: PropsType) {
    return (
      <div className='flex bg-white text-black'>
        <div className='w-[16%]'>
          <Sidebar />
        </div>
        <div className='w-[84%]'>
          <Header />
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
}

export default withSidebarAndHeader;
