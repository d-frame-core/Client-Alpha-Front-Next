/** @format */
import { Close, ConfirmationNumber, Delete, Stop } from '@mui/icons-material';
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
        <h2 className='text-xl font-bold mb-4'>{detail.surveyName}</h2>
        <p className='mb-4'>{detail.surveyDescription}</p>

        <table className='bg-blue-100 w-full my-5 border border-blue-500 rounded-md'>
          <thead className=''>
            <tr>
              <th className='text-left px-4'>Question</th>
              <th className='text-center px-4'>Option 1</th>
              <th className='text-right px-1'>Option 2</th>
            </tr>
          </thead>
          <tbody>
            {detail.totalQues.map((question: any, index: number) => (
              <tr key={index}>
                <td className='text-left px-4'>{question.title}</td>
                <td className='text-center px-4'>{question.options[0]}</td>
                <td className='text-right px-4'>{question.options[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex justify-between my-4'>
          <p>Start Date: {detail.startDate}</p>
          <p>Status : {detail.statusCampaign}</p>
          <p>End Date: {detail.endDate}</p>
        </div>

        <div className='flex justify-between gap-2'>
          <p>Total Responses: {detail.totalRes}</p>
          <p>Users Assigned: {detail.userAssigned?.length} users</p>
          <p>Total Rewards: {detail.totalReward} DFT</p>
        </div>

        <div className='flex justify-between my-4 gap-2 text-sm'>
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
