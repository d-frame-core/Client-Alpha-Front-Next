/** @format */

import React from 'react';

interface TagDetailsModalProps {
  detail?: any;
  onClose?: () => void;
  onStatus?: (id: string) => void;
}

const TagDetailsModal: React.FC<TagDetailsModalProps> = ({
  detail,
  onClose,
  onStatus,
}) => {
  async function changeStatus() {
    if (onStatus && onClose) {
      await onStatus(detail?._id);
      onClose();
    }
  }
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white text-black p-6 rounded-md max-w-[40vw] min-w-[40vw] min-h-[50vh] max-h-[50vh]'>
        <h2 className='text-xl font-bold mb-4'>Tag Details</h2>
        <div className='flex flex-col gap-2 w-full justify-center items-center'>
          <p className='font-semibold'>Created At: </p>
          <p>{detail?.createdAt}</p>
          <p className='font-semibold'>Name: </p>
          <p>{detail?.name}</p>
          <p className='font-semibold'>Status: </p>
          <p>{detail?.status}</p>
          <div className='font-semibold'>Website IDs:</div>
          <div className='flex flex-col overflow-y-auto h-20 w-full items-center'>
            {detail?.websites.map((website: any, index: number) => (
              <div>
                <p key={index}>{website}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-end mt-4'>
          <button
            onClick={onClose}
            className='bg-gray-300 text-black p-2 rounded mr-2'>
            Close
          </button>
          {onStatus && (
            <button
              onClick={changeStatus}
              className='bg-blue-500 text-white p-2 rounded'>
              Change Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagDetailsModal;
