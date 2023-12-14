/** @format */
'use client';
import DexModal from '@/components/admin/DexModal';
import React, { useEffect, useState } from 'react';

export default function UserDex() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  async function fetchDataBackend() {
    await fetch('http://localhost:8080/transaction/transactions', {
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

  async function handleDeleteFunction(id: string) {
    await fetch(`http://localhost:8080/transaction/transactions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response);
        fetchDataBackend();
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold mt-20'>
        User DEX Sale Section
      </div>
      <select
        value={selectedUserId}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedUserId(e.target.value)
        }
        className='mt-4 bg-purple-600 text-white p-2'>
        <option value=''>All</option>
        {data &&
          Array.from(new Set((data as any).map((item: any) => item.from))).map(
            (from: any) => (
              <option
                key={from}
                value={from}>
                User Id: {from}
              </option>
            )
          )}
      </select>
      <div className='bg-purple-200 w-11/12 mx-auto mt-4 rounded text-black p-2'>
        <div className='flex justify-evenly w-full bg-purple-600 text-white text-xl font-semibold py-2'>
          <div className='w-[25%] text-center border-r-8 border-yellow-500'>
            From
          </div>
          <div className='w-[25%] text-center border-r-8 border-yellow-500'>
            To
          </div>
          <div className='w-[25%] text-center border-r-8 border-yellow-500'>
            Amount
          </div>
          <div className='w-[25%] text-center'>Status</div>
        </div>
        {data && (
          <div className='flex flex-col h-80 overflow-y-auto'>
            {(data as any)
              .filter(
                (item: any) =>
                  selectedUserId === '' || item.from === selectedUserId
              )
              .map((item: any, index: any) => (
                <div
                  className='flex items-center w-full text-lg border-b-2 border-gray-900 py-2'
                  key={index}>
                  <div className='w-1/4 text-center'>{item.from}</div>
                  <div className='w-1/4 text-center'>
                    {item.to ? item.to : '*UNSOLD*'}
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
                        Verify
                      </button>
                    ) : item.status.toUpperCase() === 'UNDERREVIEW' ? (
                      <button
                        className='bg-red-500 text-white px-3 py-1 rounded'
                        onClick={() => {
                          setShowModal(true);
                          setDetail(item);
                        }}>
                        Cancel
                      </button>
                    ) : item.status.toUpperCase() === 'CANCELLED' ? (
                      <button
                        className='bg-green-500 text-white px-3 py-1 rounded'
                        onClick={() => {
                          setShowModal(true);
                          setDetail(item);
                        }}>
                        Continue
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
        <DexModal
          detail={detail}
          onClose={() => setShowModal(false)}
          onDelete={handleDeleteFunction}
        />
      )}
    </div>
  );
}
