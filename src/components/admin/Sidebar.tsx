/** @format */
'use client';
import { useState } from 'react';
import {
  AccountCircle,
  AssignmentInd,
  Assessment,
  Business,
  Campaign,
  Assignment,
  ContactMail,
  Help,
  MenuOpen,
  Quiz,
  CurrencyExchange,
  Info,
  TagSharp,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-full overflow-y-auto absolute ${
        isOpen ? ' z-50' : ''
      } flex ${isOpen ? 'w-60' : 'w-24'} bg-gray-900 text-white h-screen`}>
      <div className='flex flex-col w-full'>
        <div
          onClick={toggleSidebar}
          className='p-4 cursor-pointer flex justify-center flex-col items-center'>
          <Image
            src='/dframe.png'
            width={40}
            height={40}
            alt='D Frame'
            className={`${
              isOpen ? 'w-32 h-32' : 'w-11/12 h-16'
            } rounded-full mb-4`}
          />
          {isOpen && <p className='text-center text-2xl'>D Frame</p>}
        </div>
        <div className={`${isOpen ? 'flex-1' : 'hidden'}`}>
          <div className='flex flex-col'>
            <div className='bg-black p-4 flex flex-col gap-2 cursor-pointer'>
              <Link
                className='flex items-center mb-2'
                href={'/admin/info'}>
                <Info /> <span className='ml-2'>D Frame Info</span>
              </Link>
              <Link
                href={'/admin/website-tags'}
                className='flex items-center mb-2'>
                <TagSharp /> <span className='ml-2'>Add Tags to Site</span>
              </Link>
              <Link
                href={'/admin/add-tags'}
                className='flex items-center mb-2'>
                <Assessment /> <span className='ml-2'>Add Tags</span>
              </Link>
            </div>
            <div className='flex items-center p-2 bg-blue-400'>
              <AccountCircle /> <span className='ml-2'>User</span>
            </div>
            <div className='bg-black p-4 flex flex-col gap-2 cursor-pointer'>
              <Link
                className='flex items-center mb-2'
                href={'/admin/user-kyc'}>
                <ContactMail /> <span className='ml-2'>User KYC</span>
              </Link>

              <Link
                className='flex items-center mb-2'
                href={'/admin/user-dex'}>
                <CurrencyExchange /> <span className='ml-2'>User Dex</span>
              </Link>
              <Link
                className='flex items-center mb-2'
                href={'/admin/user-help'}>
                <Help /> <span className='ml-2'> Help</span>
              </Link>
              <Link
                href={'/admin/user-learnmore'}
                className='flex items-center mb-2'>
                <MenuOpen /> <span className='ml-2'> Learn More</span>
              </Link>
              <Link
                href={'/admin/user-faq'}
                className='flex items-center mb-2'>
                <Quiz /> <span className='ml-2'> FAQs</span>
              </Link>
            </div>
            <div className='flex items-center p-2 bg-blue-400'>
              <Business /> <span className='ml-2'>Client</span>
            </div>
            <div className='bg-black p-4 flex flex-col gap-2 cursor-pointer'>
              <Link
                href={'/admin/client-campaign'}
                className='flex items-center mb-2'>
                <Campaign /> <span className='ml-2'>Campaign</span>
              </Link>
              <Link
                href={'/admin/client-survey'}
                className='flex items-center mb-2'>
                <AssignmentInd /> <span className='ml-2'>Survey</span>
              </Link>
              <Link
                className='flex items-center mb-2'
                href={'/admin/client-help'}>
                <Help /> <span className='ml-2'> Help</span>
              </Link>
              <Link
                href={'/admin/client-learnmore'}
                className='flex items-center mb-2'>
                <MenuOpen /> <span className='ml-2'> Learn More</span>
              </Link>
              <Link
                href={'/admin/client-faq'}
                className='flex items-center mb-2'>
                <Quiz /> <span className='ml-2'> FAQs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
