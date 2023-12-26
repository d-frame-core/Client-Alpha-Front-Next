/** @format */
'use client';
import WebsiteCountModal from '@/components/admin/WebsiteCountModal';
import React, { useEffect, useState } from 'react';

export default function UserDex() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  async function fetchDataBackend() {
    await fetch('http://localhost:8080/websites/admin/get-500-sites', {
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

  async function addTags(id: string, tags: string[]) {
    await fetch(`http://localhost:8080/websites/admin/addTags/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newTags: tags,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchDataBackend();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold mt-20'>
        User Website Tagging Section
      </div>
      <div className='bg-purple-200 w-11/12 mx-auto mt-4 rounded text-black p-2'>
        <div className='flex justify-evenly w-full bg-purple-600 text-white text-xl font-semibold py-2'>
          <div className='w-[25%] text-center border-r-8 border-yellow-500'>
            Website
          </div>
          <div className='w-[25%] text-center border-r-8 border-yellow-500'>
            Counts
          </div>
          <div className='w-[25%] text-center border-r-8 border-yellow-500'>
            Tags
          </div>
          <div className='w-[25%] text-center'>Status</div>
        </div>
        {data && (
          <div className='flex flex-col h-80 overflow-y-auto'>
            {(data as any).map((item: any, index: any) => (
              <div
                className='flex items-center w-full text-lg border-b-2 border-gray-900 py-2'
                key={index}>
                <div className='w-1/4 text-center'>{item.website}</div>
                <div className='w-1/4 text-center'>
                  {item.visitorCounts} visits
                </div>
                <div className='w-1/4 text-center'>
                  {item.tags.map((tag: any, index: any) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>

                <div className='w-1/4 text-center'>
                  {item.status.toUpperCase() === 'UNTAGGED' ? (
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setDetail(item);
                      }}
                      className='bg-black text-white px-3 py-1 rounded'>
                      Add Tags
                    </button>
                  ) : item.status.toUpperCase() === 'TAGGED' ? (
                    <button
                      className='bg-blue-500 text-white px-3 py-1 rounded'
                      onClick={() => {
                        setShowModal(true);
                        setDetail(item);
                      }}>
                      Update Tag
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
        <WebsiteCountModal
          detail={detail}
          onClose={() => setShowModal(false)}
          onStatus={(detail as any).status === 'UNTAGGED' ? addTags : addTags}
        />
      )}
    </div>
  );
}
