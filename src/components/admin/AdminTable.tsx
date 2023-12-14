/** @format */
'use client';
import { Edit, Delete } from '@mui/icons-material';
import React, { useState } from 'react';
import EditModal from './EditModal';

interface AdminTableComponentProps {
  dataSet: Array<any>;
  isFAQ: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string, question: string, answer: string) => void; // Modified to include question and answer
  user: boolean;
}

const AdminTableComponent: React.FC<AdminTableComponentProps> = ({
  dataSet,
  isFAQ,
  onDelete,
  onEdit,
  user,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedId, setEditedId] = useState('');
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');

  // Function to handle opening the edit modal
  const handleEditModalOpen = (
    id: string,
    question: string,
    answer: string
  ) => {
    setEditedId(id); // Set the id in the state
    setEditedQuestion(question); // Set the question in the state
    setEditedAnswer(answer); // Set the answer in the state
    setShowEditModal(true); // Show the modal
  };

  // Function to handle closing the edit modal
  const handleEditModalClose = () => {
    setEditedAnswer('');
    setEditedQuestion('');
    setEditedId('');
    setShowEditModal(false); // Hide the modal
  };

  // Function to handle saving the edited data
  const handleSaveEdits = () => {
    // Call the onEdit function and pass the edited id, question, and answer
    onEdit(editedId, editedQuestion, editedAnswer);
    setShowEditModal(false); // Hide the modal after saving
  };
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const bgColor = user ? 'bg-purple-200' : 'bg-blue-200';
  return (
    <div className={`${bgColor} mx-auto rounded-md p-4 text-black w-11/12`}>
      <div
        className={`flex ${
          user ? 'bg-purple-600' : 'bg-blue-700'
        } font-semibold text-xl text-white py-2 px-4`}>
        <div className='w-[30%]'>{isFAQ ? 'Question' : 'Title'}</div>
        <div className='w-[48%]'>{isFAQ ? 'Answer' : 'Text'}</div>
        <div className='w-[9%]'>Edit Data</div>
        <div className='w-[9%]'>Delete Data</div>
      </div>
      <div className=' h-80 overflow-y-auto'>
        {dataSet.map((data: any, index) => (
          <div
            key={index}
            className='flex items-center border-b border-gray-500 py-4 px-4 text-lg '>
            <div className='w-[30%]  '>
              {truncateText(isFAQ ? data.question : data.title, 35)}
            </div>
            <div className='w-[51%]  '>
              {truncateText(isFAQ ? data.answer : data.text, 60)}
            </div>
            <div
              className='  w-[10%]  text-blue-800 cursor-pointer'
              onClick={() =>
                handleEditModalOpen(
                  data._id,
                  isFAQ ? data.question : data.title,
                  isFAQ ? data.answer : data.text
                )
              }>
              <Edit />
            </div>
            <div
              className='  w-[5%]  text-red-500 cursor-pointer'
              onClick={() => {
                onDelete(data._id);
              }}>
              <Delete />
            </div>
          </div>
        ))}
      </div>
      {showEditModal && (
        <EditModal
          question={editedQuestion}
          answer={editedAnswer}
          onQuestionChange={(e) => setEditedQuestion(e.target.value)}
          onAnswerChange={(e) => setEditedAnswer(e.target.value)}
          onSaveEdits={handleSaveEdits}
          onClose={handleEditModalClose}
        />
      )}
    </div>
  );
};

export default AdminTableComponent;
