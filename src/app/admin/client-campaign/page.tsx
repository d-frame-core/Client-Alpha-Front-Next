/** @format */
'use client';
import Modal from '@/components/admin/CampaignModal';
import React, { useEffect, useState } from 'react';

export default function ClientCampaign() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState('');

  async function fetchData() {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/ads/getAllCampaigns',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const verifyCampaign = async (id: string) => {
    await fetch(`http://localhost:8080/ads/admin/verifyAd/${id}`, {
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopCampaign = async (id: string) => {
    await fetch(`http://localhost:8080/ads/admin/pauseAd/${id}`, {
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCampaign = async (id: string) => {
    await fetch(`http://localhost:8080/ads/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='flex flex-col justify-center items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold mt-20'>
        Client Campaign Verification Section
      </div>
      <select
        value={selectedClientId}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedClientId(e.target.value)
        }
        className='mt-4 bg-blue-600 text-white p-2'>
        <option value=''>All</option>
        {data &&
          Array.from(
            new Set((data as any).map((item: any) => item.clientId))
          ).map((clientId: any) => (
            <option
              key={clientId}
              value={clientId}>
              Client Id: {clientId}
            </option>
          ))}
      </select>
      <div className='bg-blue-200 w-11/12 mx-auto mt-4 rounded text-black p-2'>
        <div className='flex justify-evenly w-full bg-blue-600 text-white text-xl font-semibold py-2'>
          <div className='w-[33.3%] text-center border-r-8 border-yellow-500'>
            Client Id
          </div>
          <div className='w-[33.3%] text-center border-r-8 border-yellow-500'>
            Campaign Name
          </div>
          <div className='w-[33.3%] text-center'>Update Status</div>
        </div>
        {!data && (
          <div className='flex flex-col justify-center text-2xl items-center h-80 overflow-y-auto'>
            No Data Available
          </div>
        )}
        {data && (
          <div className='flex flex-col h-80 overflow-y-auto'>
            {(data as any)
              .filter(
                (item: any) =>
                  selectedClientId === '' || item.clientId === selectedClientId
              )
              .map((item: any, index: any) => (
                <div
                  className='flex justify-evenly items-center w-full text-lg border-b-2 border-gray-900 py-2'
                  key={index}>
                  <div className='w-1/3 text-center'>{item.clientId}</div>
                  <div className='w-1/3 text-center'>{item.adName}</div>
                  <div className='w-1/3 text-center'>
                    {item.status.toUpperCase() === 'UNVERIFIED' ? (
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setDetail(item);
                        }}
                        className='bg-black text-white px-3 py-1 rounded'>
                        Verify
                      </button>
                    ) : item.status.toUpperCase() === 'VERIFIED' ? (
                      <button
                        className='bg-red-500 text-white px-3 py-1 rounded'
                        onClick={() => {
                          setShowModal(true);
                          setDetail(item);
                        }}>
                        Stop
                      </button>
                    ) : item.status.toUpperCase() === 'STOPPED' ? (
                      <button
                        className='bg-green-500 text-white px-3 py-1 rounded'
                        onClick={() => {
                          setShowModal(true);
                          setDetail(item);
                        }}>
                        Continue
                      </button>
                    ) : (
                      <p>{item.status}</p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        {showModal && detail && (
          <Modal
            detail={detail}
            onClose={() => setShowModal(false)}
            onStatus={
              (detail as any).status.toUpperCase() === 'UNVERIFIED' ||
              (detail as any).status.toUpperCase() === 'STOPPED'
                ? verifyCampaign
                : stopCampaign
            }
            stopButton={
              (detail as any).status.toUpperCase() === 'UNVERIFIED'
                ? true
                : false
            }
            status={
              (detail as any).status.toUpperCase() === 'UNVERIFIED'
                ? 'VERIFIED'
                : (detail as any).status.toUpperCase() === 'STOPPED'
                ? 'CONTINUE'
                : 'STOP'
            }
            onDelete={deleteCampaign}
            onStop={stopCampaign}
          />
        )}
      </div>
    </div>
  );
}
