/** @format */
'use client';
import RewardsRequestModal from '@/components/admin/RewardsRequestModal';
import React, { useEffect, useState } from 'react';

export default function UserRewards() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  async function fetchDataBackend() {
    await fetch('http://localhost:8080/rewards/rewardRequests/getAll', {
      method: 'GET',
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    fetchDataBackend();
  }, []);

  async function completeTransaction(address: string) {
    await fetch(`http://localhost:8080/dframeUser/admin/reward`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: address,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchDataBackend();
      })
      .catch((error) => console.log(error));
  }

  async function failTransaction() {}
  return (
    <div className='flex flex-col justify-center items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold mt-20'>
        User Rewards Request Section
      </div>
      <div className='bg-purple-200 w-11/12 mx-auto mt-4 rounded text-black p-2'>
        <div className='flex justify-evenly w-full bg-purple-600 text-white text-xl font-semibold py-2'>
          <div className='w-[25%] text-center border-r-8 border-yellow-500'>
            User Id
          </div>
          <div className='w-[25%] text-center border-r-8 border-yellow-500'>
            Public Address
          </div>
          <div className='w-[25%] text-center border-r-8 border-yellow-500'>
            Amount
          </div>
          <div className='w-[25%] text-center'>Status</div>
        </div>
        {data && (
          <div className='flex flex-col h-80 overflow-y-auto'>
            {(data as any).map((item: any, index: any) => (
              <div
                className='flex items-center w-full text-lg border-b-2 border-gray-900 py-2'
                key={index}>
                <div className='w-1/4 text-center'>{item.DframeUserId}</div>
                <div className='w-1/4 text-center'>
                  {item.publicAddress.slice(0, 7)}...
                  {item.publicAddress.slice(-7)}
                </div>
                <div className='w-1/4 text-center'>{item.amount} DFT</div>

                <div className='w-1/4 text-center'>
                  {item.status.toUpperCase() === 'PENDING' ? (
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setDetail(item);
                      }}
                      className='bg-black text-white px-3 py-1 rounded'>
                      Complete Request
                    </button>
                  ) : item.status.toUpperCase() === 'FAILED' ? (
                    <button
                      className='bg-red-500 text-white px-3 py-1 rounded'
                      onClick={() => {
                        setShowModal(true);
                        setDetail(item);
                      }}>
                      Redo Request
                    </button>
                  ) : (
                    <p>{item.status.toUpperCase()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && detail && (
        <RewardsRequestModal
          detail={detail}
          onClose={() => setShowModal(false)}
          onDelete={failTransaction}
          onStatus={completeTransaction}
        />
      )}
    </div>
  );
}
