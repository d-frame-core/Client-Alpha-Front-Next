/** @format */

// components/Info.tsx
'use client';
import { useEffect, useState } from 'react';

const Info: React.FC = () => {
  const [infoData, setInfoData] = useState<any>(null);

  const fetchData = async () => {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/userinfo/admin/allInfo',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setInfoData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const renderStatusSection = (statusData: any, sectionName: string) => {
    return (
      <div
        key={sectionName}
        className='mb-8'>
        <div className='bg-blue-100 p-4 rounded shadow text-black'>
          <h2 className='text-lg font-semibold mb-2'>{sectionName}</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div>Total: {statusData?.total}</div>
            {statusData.status?.map((status: any) => (
              <div key={status._id}>
                {status._id}: {status.total}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col  justify-center items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold mt-20'>
        D Frame Analytics Information
      </div>
      {infoData && (
        <>
          <div className='my-8 text-2xl text-center text-black'>
            <div className='font-semibold'>
              Client Count: {infoData?.clientInfo?.total} users
            </div>
            <div className='font-semibold'>
              User Count: {infoData?.usersInfo?.total} users
            </div>
          </div>
          <div className='flex flex-wrap justify-evenly items-center gap-32'>
            {Object.keys(infoData).map((sectionName) => {
              if (sectionName !== 'usersInfo' && sectionName !== 'clientInfo') {
                return renderStatusSection(infoData[sectionName], sectionName);
              }
              return null;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Info;
