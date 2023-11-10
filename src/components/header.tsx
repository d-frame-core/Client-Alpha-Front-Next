/** @format */

import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import { AppContext } from '@/context/context';
function Header() {
  const { setClientData, clientData } = useContext(AppContext);
  useEffect(() => {
    // Retrieve the data from localStorage
    const storedData = localStorage.getItem('dframeClientData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setClientData(parsedData);
    }
  }, []);
  return (
    <header className='w-[100%] bg-gradient-to-r from-violet-800 via-violet-500 to-gray-300 flex justify-end p-2'>
      <div className='w-12 h-12 rounded-full bg-white mr-4'>
        <Image
          src={clientData?.profileImage ? clientData.profileImage : ''}
          width={12}
          height={12}
          alt='Profile'
          className='rounded-full w-full h-full border border-blue-300'
        />
      </div>
      <p className='my-auto mr-4'>{clientData?.companyName.slice(0, 9)}</p>
      <Link href='/logout'>
        <div className='px-4 h-8 mt-2 pt-[2px] bg-blue-600 text-center text-white rounded-lg'>
          <LogoutIcon />
        </div>
      </Link>
    </header>
  );
}

export default Header;
