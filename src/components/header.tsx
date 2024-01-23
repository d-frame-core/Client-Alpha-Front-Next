/** @format */

import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import { AppContext } from '@/context/context';
import { useRouter } from 'next/navigation';
function Header() {
  const { setClientData, clientData } = useContext(AppContext);
  useEffect(() => {
    // Retrieve the data from localStorage
    const storedData =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('dframeClientData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setClientData(parsedData);
    }
  }, []);
  const router = useRouter();
  const handleLogout = async () => {
    window.localStorage.removeItem('tokenForClient');
    window.localStorage.removeItem('walletAddress');
    window.localStorage.removeItem('dframeClientData');
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [{ eth_accounts: {} }],
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className='absolute top-0 left-[20%] w-[80%] bg-gradient-to-r from-blue-800 via-blue-500 to-gray-300 flex justify-end p-2'>
      <div className='w-12 h-12 rounded-full bg-white mr-2'>
        <Image
          src={clientData?.profileImage ? clientData.profileImage : ''}
          width={12}
          height={12}
          alt='Profile'
          className='rounded-full w-full h-full border border-blue-300'
        />
      </div>
      <p className='my-auto mr-4'>{clientData?.companyName}</p>
      <div onClick={handleLogout}>
        <div className='px-4 h-8 cursor-pointer mt-2 pt-[2px] bg-blue-600 text-center text-white rounded-lg'>
          <LogoutIcon />
        </div>
      </div>
    </header>
  );
}

export default Header;
