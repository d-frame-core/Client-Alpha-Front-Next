/** @format */

import Sidebar from '@/components/admin/Sidebar';

export const metadata = {
  title: 'D Frame - Admin',
  description:
    'Join D Frame for the Universal Basic Income (UBI) revolution on Blockchain',
  keywords: [],
};

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex bg-white'>
      <Sidebar />
      <div className='flex-1 justify-center items-center'>{children}</div>
    </div>
  );
}
