/** @format */
'use client';
import Modal from '@/components/admin/KYCModal';
import React, { useEffect, useState } from 'react';

export default function UserKyc() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState();

  async function fetchData() {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/dframeUser/admin/getAllUsers',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item: any) =>
            !(
              item.kyc1.status.toUpperCase() === 'UNSUBMITTED' &&
              item.kyc2.status.toUpperCase() === 'UNSUBMITTED' &&
              item.kyc3.status.toUpperCase() === 'UNSUBMITTED'
            )
        );
        setData(filteredData);
        console.log(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function kycVerification(kycLevel: string) {
    if (kycLevel === 'kyc1') {
      console.log('KYC level is KYC1');
    } else if (kycLevel === 'kyc2') {
      console.log('KYC level is KYC2');
    } else if (kycLevel === 'kyc3') {
      console.log('KYC level is KYC3');
    } else {
      console.log('Invalid KYC level');
    }
  }
  async function wrongKycVerifiction(kycLevel: string) {
    if (kycLevel === 'kyc1') {
      console.log('KYC level is KYC1');
    } else if (kycLevel === 'kyc2') {
      console.log('KYC level is KYC2');
    } else if (kycLevel === 'kyc3') {
      console.log('KYC level is KYC3');
    } else {
      console.log('Invalid KYC level');
    }
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold mt-20'>
        User KYC Verification Section
      </div>
      <div className='bg-purple-200 w-11/12 mx-auto mt-4 rounded text-black p-2'>
        <div className='flex justify-evenly w-full bg-purple-600 text-white text-xl font-semibold py-2'>
          <div className='w-[33.3%] text-center border-r-8 border-yellow-500'>
            User Id
          </div>
          <div className='w-[33.3%] text-center border-r-8 border-yellow-500'>
            KYC Level
          </div>
          <div className='w-[33.3%] text-center'>Status</div>
        </div>
        {!data ||
          ((data as any).length < 1 && (
            <div className='flex flex-col justify-center text-2xl items-center h-80 overflow-y-auto'>
              No Data Available
            </div>
          ))}
        {data && (
          <div className='flex flex-col h-80 overflow-y-auto'>
            {(data as any).map((item: any, index: number) => {
              return (
                <div
                  className='flex justify-evenly items-center w-full text-lg border-b-2 border-gray-900 py-2'
                  key={index}>
                  <div className='w-[33.3%] text-center'>{item.id}</div>
                  <div className='w-[33.3%] text-center'>
                    <p>KYC 1 - {item.kyc1.status.toUpperCase()}</p>
                    <p>KYC 2 - {item.kyc2.status.toUpperCase()}</p>
                    <p>KYC 3 - {item.kyc3.status.toUpperCase()}</p>
                  </div>

                  <div className='w-[33.3%] text-center'>
                    <button
                      className='bg-black text-white px-3 py-1 rounded'
                      onClick={() => {
                        setDetail(item);
                        setShowModal(true);
                      }}>
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showModal && detail && (
          <Modal
            detail={detail}
            onClose={() => setShowModal(false)}
            onStatus={kycVerification}
            onStop={wrongKycVerifiction}
          />
        )}
      </div>
    </div>
  );
}
