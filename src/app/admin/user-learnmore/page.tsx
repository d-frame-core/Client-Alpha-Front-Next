/** @format */
'use client';
import Modal from '@/components/admin/AddModal';
import AdminTableComponent from '@/components/admin/AdminTable';
import React, { useEffect, useState } from 'react';

export default function LearnMore() {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  async function fetchData() {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/Learnmore/userLearn/getAllLearn',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const addLearnMore = async (title: string, text: string) => {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/Learnmore/userLearn/addLearn',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          text,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => fetchData())
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteLearnMore = async (id: string) => {
    await fetch(
      `https://client-backend-402017.el.r.appspot.com/Learnmore/userLearn/deleteOne/${id}`,
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

  const editLearnMore = async (id: string, title: string, text: string) => {
    await fetch(
      `https://client-backend-402017.el.r.appspot.com/Learnmore/userLearn/update/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          text,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => fetchData())
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='flex flex-col justify-center gap-5 items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold'>
        User Learn More Section
      </div>
      <h2
        className='text-xl mt-4 cursor-pointer bg-black text-white flex justify-center py-3 rounded px-4'
        onClick={() => setShowModal(true)}>
        Add User Learn More
      </h2>
      {data && (
        <AdminTableComponent
          dataSet={data}
          isFAQ={false}
          user={true}
          onDelete={deleteLearnMore}
          onEdit={editLearnMore}
        />
      )}
      {showModal && (
        <Modal
          title='Learn More'
          onClose={() => setShowModal(false)}
          onAdd={addLearnMore}
        />
      )}
    </div>
  );
}
