/** @format */

import React from 'react';

interface EditModalProps {
  question: string;
  answer: string;
  onQuestionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnswerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveEdits: () => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  question,
  answer,
  onQuestionChange,
  onAnswerChange,
  onSaveEdits,
  onClose,
}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-md'>
        <h2 className='text-xl font-bold mb-4'>Edit Details</h2>
        <input
          type='text'
          value={question}
          onChange={onQuestionChange}
          className='w-full border border-gray-300 rounded-md p-2 mb-4'
        />
        <input
          type='text'
          value={answer}
          onChange={onAnswerChange}
          className='w-full border border-gray-300 rounded-md p-2 mb-4'
        />
        <div className='flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 border-blue-500 text-blue border-2 rounded-md'>
            Close
          </button>
          <button
            onClick={onSaveEdits}
            className='px-4 py-2 bg-blue-500 text-white rounded-md'>
            Save Edits
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
