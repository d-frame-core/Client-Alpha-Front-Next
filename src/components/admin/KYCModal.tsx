/** @format */

import {
  ArrowBack,
  ArrowForward,
  Close,
  PauseCircleFilled,
} from '@mui/icons-material';
import DoneIcon from '@mui/icons-material/Done';
import Image from 'next/image';
import React, { useState } from 'react';

interface ModalProps {
  detail: any;
  onClose: () => void;
  onStatus: (kycLevel: any) => void;
  onStop: (kycLevel: any) => void;
}

const Modal: React.FC<ModalProps> = ({ detail, onClose, onStatus, onStop }) => {
  const [currentPage, setCurrentPage] = useState(1);
  let kycLevel;
  const handleVerification = () => {
    let kycLevel;

    switch (currentPage) {
      case 1:
        kycLevel = 'kyc1';
        break;
      case 2:
        kycLevel = 'kyc2';
        break;
      case 3:
        kycLevel = 'kyc3';
        break;
      default:
        // Handle default case
        break;
    }

    // Call the onStatus function with the dynamically determined kycLevel
    onStatus(kycLevel);
  };

  const stopVerification = () => {
    let kycLevel;

    switch (currentPage) {
      case 1:
        kycLevel = 'kyc1';
        break;
      case 2:
        kycLevel = 'kyc2';
        break;
      case 3:
        kycLevel = 'kyc3';
        break;
      default:
        // Handle default case
        break;
    }

    // Call the onStatus function with the dynamically determined kycLevel
    onStop(kycLevel);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  let pageContent;
  let status;
  switch (currentPage) {
    case 1:
      kycLevel = 'KYC1';
      pageContent = (
        <div className='flex items-center justify-evenly mt-12 gap-8 font-semibold text-xl w-11/12 mx-auto flex-wrap'>
          <h3>First Name: {detail.kyc1.details.firstName}</h3>
          <h3>Last Name: {detail.kyc1.details.lastName}</h3>

          <h3>Email: {detail.kyc1.details.email}</h3>
          <h3>Phone Number: {detail.kyc1.details.phoneNumber}</h3>
          <h3>Username: {detail.kyc1.details.userName}</h3>
        </div>
      );
      status = (
        <div className='text-center my-4 flex gap-4 justify-center text-purple-500'>
          Status:{' '}
          {detail.kyc1.status == 'UNVERIFIED' ? (
            <div>
              <PauseCircleFilled /> {detail.kyc1.status}
            </div>
          ) : detail.kyc1.status == 'VERIFIED' ? (
            <div>
              <DoneIcon /> {detail.kyc1.status}
            </div>
          ) : (
            <div>{detail.kyc1.status}</div>
          )}
        </div>
      );
      break;
    case 2:
      kycLevel = 'KYC2';
      pageContent = (
        <div className='flex items-center text-xl font-semibold flex-wrap justify-evenly gap-8 w-11/12 mx-auto'>
          <h3>Annual Income: {detail.kyc2.details.annualIncome}</h3>
          <h3>City: {detail.kyc2.details.city}</h3>
          <h3>Country: {detail.kyc2.details.country}</h3>

          <h3>Date of Birth: {detail.kyc2.details.dob}</h3>
          <h3>Door No: {detail.kyc2.details.doorno}</h3>
          <h3>Gender: {detail.kyc2.details.gender}</h3>

          <h3>Pincode: {detail.kyc2.details.pincode}</h3>
          <h3>State: {detail.kyc2.details.state}</h3>
          <h3>Street: {detail.kyc2.details.street}</h3>
        </div>
      );
      status = (
        <div className='text-center my-4 flex gap-4 justify-center text-purple-500'>
          Status:{' '}
          {detail.kyc1.status == 'UNVERIFIED' ? (
            <div>
              <PauseCircleFilled /> {detail.kyc2.status}
            </div>
          ) : detail.kyc1.status == 'VERIFIED' ? (
            <div>
              <DoneIcon /> {detail.kyc2.status}
            </div>
          ) : (
            <div>{detail.kyc2.status}</div>
          )}
        </div>
      );
      break;
    case 3:
      kycLevel = 'KYC3';
      pageContent = (
        <div className='flex items-center justify-evenly mt-8 gap-8 w-11/12 mx-auto'>
          <div className='flex-col text-center font-semibold'>
            <h3>ID Proof</h3>
            <a
              href={detail.kyc3.idProof}
              target='_blank'
              rel='noopener noreferrer'>
              <Image
                src={detail.kyc3.idProof}
                width={150}
                height={40}
                alt='ID Proof'
              />
            </a>
          </div>
          <div className='flex-col text-center font-semibold'>
            <h3>User Photo:</h3>
            <a
              href={detail.kyc3.userPhoto}
              target='_blank'
              rel='noopener noreferrer'>
              <Image
                src={detail.kyc3.userPhoto}
                width={150}
                height={40}
                alt='User Photo'
              />
            </a>
          </div>
          <div className='flex-col text-center font-semibold'>
            <h3>Address Proof:</h3>
            <a
              href={detail.kyc3.addressProof}
              target='_blank'
              rel='noopener noreferrer'>
              <Image
                src={detail.kyc3.addressProof}
                width={150}
                height={30}
                alt='Address Proof'
              />
            </a>
          </div>
        </div>
      );
      status = (
        <div className='text-center my-2 flex justify-center text-purple-500'>
          Status:{' '}
          {detail.kyc1.status == 'UNVERIFIED' ? (
            <div>
              <PauseCircleFilled /> {detail.kyc1.status}
            </div>
          ) : detail.kyc1.status == 'VERIFIED' ? (
            <div>
              <DoneIcon /> {detail.kyc1.status}
            </div>
          ) : (
            <div>{detail.kyc1.status}</div>
          )}
        </div>
      );
      break;
    default:
      pageContent = null;
      status = null;
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white text-black px-6 py-2 rounded-md min-w-[50vw] min-h-[45vh] max-h-[45vh] max-w-[50vw] flex flex-col justify-between '>
        <div>
          <div className='mb-4 text-center'>
            <div className='text-xl'>{kycLevel} Details of:</div>
            <div className='text-lg text-purple-500'>
              {detail.publicAddress} / {detail.id}
            </div>
          </div>

          {pageContent}
          {status}
        </div>
        <div className='flex justify-end gap-4'>
          <button
            className='px-4 py-2 border-purple-500 text-purple-500 border-2 rounded-md'
            onClick={onClose}>
            <Close /> Close
          </button>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded-md'
            onClick={stopVerification}>
            PAUSE this !!
          </button>
          <button
            className='px-4 py-2 bg-green-500 text-white rounded-md'
            onClick={handleVerification}>
            Verify This
          </button>
          {currentPage > 1 && (
            <button
              className='px-4 py-2 bg-purple-500 text-white rounded-md'
              onClick={() => handlePageChange(currentPage - 1)}>
              <ArrowBack /> Back
            </button>
          )}
          {currentPage < 3 && (
            <button
              className='px-4 py-2 bg-purple-500 text-white rounded-md'
              onClick={() => handlePageChange(currentPage + 1)}>
              <ArrowForward /> Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
