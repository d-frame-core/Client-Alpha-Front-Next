/** @format */

import { Close, ConfirmationNumber, Delete, Stop } from '@mui/icons-material';
import Image from 'next/image';
import React from 'react';

interface ModalProps {
  detail: any;
  onClose?: () => void;
  onStatus?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStop?: (id: string) => void;
  status?: string;
  stopButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  detail,
  onClose,
  onStatus,
  status,
  onDelete,
  stopButton,
  onStop,
}) => {
  async function handleStatus() {
    if (onStatus && onClose) {
      await onStatus(detail._id);
      onClose();
    }
  }
  async function handleDelete() {
    if (onDelete && onClose) {
      await onDelete(detail._id);
      onClose();
    }
  }

  async function handleStop() {
    if (onStop && onClose) {
      await onStop(detail._id);
      onClose();
    }
  }
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white text-black p-6 rounded-md max-w-[40vw] min-w-[40vw]'>
        <h2 className='text-xl font-bold mb-4'>{detail.adName}</h2>
        <p className='mb-4'>{detail.adContent}</p>
        {detail.adType && (
          <div className='w-full flex justify-center'>
            {detail.adType.toString().toLowerCase() == 'image' ? (
              <Image
                width={160}
                height={40}
                src={detail.image}
                alt={detail.adName}
                className='mb-4'
              />
            ) : (
              <video
                width={288} // Adjust the width as needed
                height={202} // Adjust the height as needed
                controls
                autoPlay>
                <source
                  src={detail.image}
                  type='video/mp4'
                />
                <source
                  src={detail.image}
                  type='video/webm'
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        <div className='flex justify-between my-4'>
          <p>Per Day: {detail.perDay} DFT</p>
          <p>Total Days: {detail.totalDays} Days</p>
          <p>Bid Amount: {detail.bidAmount} DFT</p>
        </div>
        <div className='flex flex-wrap gap-2 my-4 justify-center'>
          {detail.tags.map((tag: string, index: number) => (
            <div
              key={index}
              className='bg-blue-500 text-white px-2 py-1 rounded'>
              {tag}
            </div>
          ))}
        </div>
        <div className='flex justify-between gap-2'>
          <p>Start Date: {detail.startDate}</p>
          <p>End Date: {detail.endDate}</p>
          <p>Status: {detail.status}</p>
        </div>
        <div className='flex justify-between my-4 text-sm gap-2'>
          <p>ID: {detail._id}</p>
          <p>Client ID: {detail.clientId}</p>
        </div>
        <div className='flex justify-end gap-4'>
          <button
            className='px-4 py-2 bg-red-500 text-white border-2 rounded-md'
            onClick={handleDelete}>
            <Delete /> Delete
          </button>
          <button
            className='px-4 py-2 border-blue-500 text-blue-500 border-2 rounded-md'
            onClick={onClose}>
            <Close /> Close
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
            onClick={handleStatus}>
            <ConfirmationNumber /> Confirm {status}
          </button>
          {stopButton && (
            <button
              className='px-4 py-2 bg-red-500 text-white rounded-md'
              onClick={handleStop}>
              <Stop /> STOP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
