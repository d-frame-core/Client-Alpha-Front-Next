/** @format */
'use client';
import React, { useState } from 'react';

type DexModalProps = {
  onClose?: () => void;
  onDelete?: (id: string) => void;
  onStatus?: (
    walletAddress: string,
    key: string,
    amount: string,
    rewardId: string
  ) => void;
  detail?: any;
};

const RewardsRequestModal: React.FC<DexModalProps> = ({
  onClose,
  onDelete,
  onStatus,
  detail,
}) => {
  const [key, setKey] = useState('');
  async function handleStatus() {
    if (onStatus && onClose) {
      await onStatus(detail?.publicAddress, key, detail?.amount, detail?._id);
      onClose();
    }
  }
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white text-black p-6 rounded-md max-w-[40vw] min-w-[40vw] min-h-[30vh] max-h-[30vh]'>
        <h2 className='text-xl font-bold mb-4'>Reward Request</h2>
        <div className='flex my-4 justify-around'>
          <div className='mr-2'>
            <span className='font-semibold'>User Id:</span>{' '}
            {detail?.DframeUserId}
          </div>
          <div className='mr-2'>
            <span className='font-semibold'>Amount:</span> {detail?.amount} DFT
          </div>
        </div>
        <div className='my-4 flex justify-evenly'>
          <div className='mb-4'>
            <span className='font-semibold'>Status:</span> {detail?.status}
          </div>
        </div>
        <div className='flex justify-evenly w-full my-4'>
          <div>Enter Private Key: </div>
          <input
            className='w-1/2 border-2 border-blue-600'
            type='text'
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <div className='flex justify-end'>
          <button
            className='px-4 py-2 bg-gray-300 rounded mr-2'
            onClick={onClose}>
            Close
          </button>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded mr-2'
            onClick={async () => {
              if (onDelete && onClose) {
                await onDelete(detail?.publicAddress);
                onClose();
              }
            }}>
            Reject
          </button>
          <button
            className='bg-blue-500 text-white px-3 py-1 rounded'
            onClick={handleStatus}>
            {detail?.status.toUpperCase() === 'PENDING'
              ? 'Approve'
              : detail?.status.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardsRequestModal;
