import Link from 'next/link';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
function Header() {
  return (
    <header className="w-[100%] bg-gradient-to-r from-violet-800 via-violet-500 to-gray-300 flex justify-end p-2">
      <div className='w-12 h-12 rounded-full bg-white mr-4'>
      </div>
      <p className='my-auto mr-4'>User Name</p>
      <Link href="/logout">
      <div className='px-4 h-8 mt-2 pt-[2px] bg-blue-600 text-center text-white rounded-lg'>
      <LogoutIcon/>
      </div>
      </Link>
    </header>
  );
}

export default Header;
