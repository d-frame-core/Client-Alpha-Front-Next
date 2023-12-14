/** @format */
'use client';
import Modal from '@/components/admin/AddModal';
import AdminTableComponent from '@/components/admin/AdminTable';
import React, { useEffect, useState } from 'react';

export default function adminFAQ() {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  async function fetchData() {
    await fetch('https://client-backend-402017.el.r.appspot.com/F&Q/faq', {
      method: 'GET',
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
      });
  }
  // Function to add FAQ
  const addFaq = async (question: any, answer: any) => {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/F&Q/addSingleFaq',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          fetchData();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to delete FAQ
  const deleteFaq = async (id: string) => {
    await fetch(
      `https://client-backend-402017.el.r.appspot.com/F&Q/admin/deleteFaq/${id}`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => response.json())
      .then((data) => fetchData())
      .catch((err) => {
        console.log(err);
      });
  };

  const editFaq = async (id: string, question: any, answer: any) => {
    await fetch(
      `https://client-backend-402017.el.r.appspot.com/F&Q/admin/updateFaq/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => fetchData())
      .catch((err) => {
        console.log(err);
      });
  };
  async function closeModal() {
    setShowModal(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex flex-col justify-center gap-5 items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold'>
        Client FAQ Section
      </div>
      <h2
        className='text-xl mt-4 cursor-pointer bg-black text-white flex justify-center py-3 rounded w-64'
        onClick={() => setShowModal(true)}>
        Add Client FAQ
      </h2>
      {showModal && (
        <Modal
          title='FAQ'
          onClose={closeModal}
          onAdd={addFaq}
        />
      )}

      {data && (
        <AdminTableComponent
          onDelete={deleteFaq}
          onEdit={editFaq}
          isFAQ={true}
          dataSet={data}
          user={false}
        />
      )}
    </div>
  );
}
