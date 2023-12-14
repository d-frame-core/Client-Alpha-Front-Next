/** @format */
'use client';
import Modal from '@/components/admin/AddModal';
import AdminTableComponent from '@/components/admin/AdminTable';
import React, { useEffect, useState } from 'react';

export default function LearnMore() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  async function fetchData() {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/Help/readAllHelp',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addHelp = async (title: string, text: string) => {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/Help/admin/addsingleHelp',
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
      .then((data) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to delete Help
  const deleteHelp = async (id: string) => {
    await fetch(
      `https://client-backend-402017.el.r.appspot.com/Help/admin/deleteSingle/${id}`,
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

  const editHelp = async (id: string, title: string, text: string) => {
    await fetch(
      `https://client-backend-402017.el.r.appspot.com/Help/admin/update/${id}`,
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
  async function closeModal() {
    setShowModal(false);
  }
  return (
    <div className='flex flex-col justify-center gap-5 items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold'>
        Client Help Section
      </div>
      <h2
        className='text-xl mt-4 cursor-pointer bg-black text-white flex justify-center py-3 rounded w-64'
        onClick={() => setShowModal(true)}>
        Add Client Help
      </h2>
      {showModal && (
        <Modal
          title='Help'
          onClose={closeModal}
          onAdd={addHelp}
        />
      )}

      {data && (
        <AdminTableComponent
          onDelete={deleteHelp}
          onEdit={editHelp}
          isFAQ={false}
          dataSet={data}
          user={false}
        />
      )}
    </div>
  );
}
