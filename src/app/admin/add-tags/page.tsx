/** @format */
'use client';
import TagDetailsModal from '@/components/admin/TagsModal';
import React, { useEffect } from 'react';

const UserWebsiteTagging: React.FC = () => {
  const [existingTags, setExistingTags] = React.useState<any>(null);
  const [newTag, setNewTag] = React.useState<any>(null);
  const [particularTag, setParticularTag] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState<any>(false);

  async function fetchDataBackend() {
    setNewTag(null);
    setExistingTags(null);
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/tags/admin/getAll',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setExistingTags(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    fetchDataBackend();
  }, []);

  async function addTag() {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/tags/admin/createTag',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagData: newTag,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchDataBackend();
      })
      .catch((error) => console.log(error));
  }

  async function changeTagStatus(id: string) {
    await fetch(
      `https://client-backend-402017.el.r.appspot.com/tags/admin/statusChange/${id}`,
      {
        method: 'PUT',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchDataBackend();
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen w-11/12 ml-[6.5rem]'>
      <div className='text-black text-4xl font-semibold mt-20'>
        User Rewards Request Section
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Tags component goes here */}
        {existingTags &&
          existingTags.map((tag: any) => (
            <div
              key={tag._id}
              className={`${
                tag.status.toUpperCase() === 'ACTIVE'
                  ? 'bg-purple-600'
                  : 'bg-gray-700'
              } text-white p-2 rounded-lg mr-2 mt-2 cursor-pointer`}
              onClick={() => {
                setShowModal(true);
                setParticularTag(tag);
              }}>
              {tag.name}
            </div>
          ))}
      </div>
      <input
        type='text'
        className='text-black text-xl font-semibold mt-10 pl-5 py-1 rounded border-2 border-purple-400'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTag(e.target.value)
        }
        value={newTag}
        placeholder='Enter tag'
      />
      <button
        className='bg-black mt-10 rounded px-2 py-1 text-xl'
        onClick={addTag}>
        Add
      </button>

      {showModal && (
        <TagDetailsModal
          detail={particularTag}
          onStatus={changeTagStatus}
          onClose={() => {
            setShowModal(false);
            setParticularTag(null);
          }}
        />
      )}
    </div>
  );
};

export default UserWebsiteTagging;
