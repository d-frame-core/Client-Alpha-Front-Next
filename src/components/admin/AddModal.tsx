/** @format */

'use client';
import React from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  onAdd: (question: string, answer: string) => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, onAdd }) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const handleAdd = async () => {
    await onAdd(question, answer);
    onClose();
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  // Placeholder based on the title
  const placeholderQuestion = title === 'FAQ' ? 'Question' : 'Title';
  const placeholderAnswer = title === 'FAQ' ? 'Answer' : 'Text';

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center text-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-md'>
        <h2 className='text-xl font-bold mb-4 text-black'>Add {title}</h2>
        <input
          type='text'
          placeholder={placeholderQuestion}
          value={question}
          onChange={handleQuestionChange}
          className='w-full border border-gray-300 rounded-md p-2 mb-4'
        />
        <input
          type='text'
          placeholder={placeholderAnswer}
          value={answer}
          onChange={handleAnswerChange}
          className='w-full border border-gray-300 rounded-md p-2 mb-4'
        />
        <div className='flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 border-blue-500 text-blue border-2 rounded-md'>
            Close
          </button>
          <button
            onClick={handleAdd}
            className='px-4 py-2 bg-blue-500 text-white rounded-md'>
            Add {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
