/** @format */
'use client';
import React, { useState } from 'react';

interface ModalProps {
  phone?: string;
  onClose?: () => void;
  onSendOtp?: () => void;
  onVerify?: (enteredNumber: any, enteredOTP: any) => void;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  onSendOtp,
  onVerify,
  phone,
}) => {
  const [enteredNumber, setEnteredNumber] = useState(phone);
  const [enteredOTP, setEnteredOTP] = useState('');

  const handleVerify = () => {
    if (enteredNumber === '') {
      alert('No Number entered');
    } else {
      onVerify?.(enteredNumber, enteredOTP);
    }
  };

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-80'>
        <span
          className='absolute top-[17rem] right-[39.5rem] text-black text-4xl cursor-pointer'
          onClick={onClose}>
          X
        </span>
        <div>
          <div className='mb-4'>
            <label>Enter Number:</label>
            <input
              type='text'
              placeholder='Enter Number'
              value={enteredNumber}
              onChange={(e) => setEnteredNumber(e.target.value)}
              className='border px-2 py-1 rounded-md w-full'
            />
          </div>
          <div className='mb-4'>
            <button
              onClick={onSendOtp}
              className='px-4 py-2 bg-blue-500 text-white rounded-md w-full'>
              Send OTP
            </button>
          </div>
          <div className='mb-4'>
            <div className='mb-2'>
              <label>Enter OTP:</label>
              <input
                type='text'
                placeholder='Enter OTP'
                value={enteredOTP}
                onChange={(e) => setEnteredOTP(e.target.value)}
                className='border px-2 py-1 rounded-md w-full'
              />
            </div>
            <div>
              <button
                onClick={handleVerify}
                className='px-4 py-2 bg-blue-500 text-white rounded-md w-full'>
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
