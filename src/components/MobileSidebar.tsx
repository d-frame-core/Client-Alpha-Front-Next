/** @format */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PollIcon from '@mui/icons-material/Poll';
import SettingsIcon from '@mui/icons-material/Settings';
interface TabOptionInterface {
  name: string;
  icon: JSX.Element;
  link: string;
}
const tabOptions: TabOptionInterface[] = [
  {
    name: 'Profile',
    icon: <AccountBoxIcon />,
    link: '/profile',
  },
  {
    name: 'Wallet',
    icon: <AccountBalanceWalletIcon />,
    link: '/wallet',
  },
  {
    name: 'Data Pool',
    icon: <FilePresentIcon />,
    link: '/dataPool',
  },
  {
    name: 'Campaigns',
    icon: <OndemandVideoIcon />,
    link: '/campaigns',
  },
  {
    name: 'Surveys',
    icon: <PollIcon />,
    link: '/surveys',
  },
  {
    name: 'Setting',
    icon: <SettingsIcon />,
    link: '/setting',
  },
];
function MobileSidebar() {
  function TabBar({ data }: { data: TabOptionInterface }) {
    return (
      <Link href={data.link}>
        <div className='py-[4px] pl-6'>
          {window.location.pathname === data.link ? (
            <div className='flex justify-left text-[#1B2B65] pl-2 p-2 bg-white rounded-l-lg -mr-2'>
              <p>{data.icon}</p>
              <p className='pl-6'>{data.name}</p>
            </div>
          ) : (
            <div className='flex justify-left text-white hover:text-[#1B2B65] pl-2 p-2 bg-[#1B2B65] hover:bg-white hover:rounded-l-lg hover:-mr-2'>
              <p>{data.icon}</p>
              <p className='pl-6'>{data.name}</p>
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`md:w-[100%] h-[99vh] bg-gradient-to-b from-indigo-700 via-sky-600 to-cyan-500 shadow border border-black text-xl`}>
      {/* logo */}

      <div>
        <Image
          src='/dframe.png'
          alt='logo'
          width={100}
          height={100}
          className='mx-auto mt-4'
        />
        <p className='text-center mt-2 text-[24px] font-bold text-[#0A194E]'>
          D Frame
        </p>
      </div>

      {/* simple Tabs */}
      <ul className='mt-12 bg-[#1B2B65] py-2'>
        {tabOptions.map((singleTab: TabOptionInterface, index: Number) => (
          <li>
            <TabBar data={singleTab} />
          </li>
        ))}
      </ul>

      {/* help and learn  */}
      <div className='bg-[#1B2B65] w-[85%] mx-auto mt-24 rounded-lg text-center text-white pb-2'>
        <div className='relative'>
          <div className='m-auto absolute -top-4 left-[40%] bg-[#AABBFA] w-10 h-10 pt-[4px] rounded-full'>
            <div className='m-auto  bg-[#1B2B65] w-8 h-8 pt-[3px] text-[20px] rounded-full'>
              <p>?</p>
            </div>
          </div>
        </div>
        <p className='pt-8 text-sm'>Need Help with D Frame?</p>
        <Link href='/help'>
          <div className='rounded-lg px-4 py-2 my-2 text-center text-white bg-[#017EFA] w-[80%] m-auto'>
            <p>Go to help center</p>
          </div>
        </Link>
      </div>

      <Link href='/learnMore'>
        <p className='text-center text-black mt-8 font-semibold underline text-md'>
          Learn More
        </p>
      </Link>
    </div>
  );
}
export default MobileSidebar;
