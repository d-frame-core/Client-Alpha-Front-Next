/** @format */
'use client';
import React, { useEffect } from 'react';

type DexModalProps = {
  onClose?: () => void;
  onDelete?: (id: string) => void;
  onStatus?: (id: string, tags: string) => void;
  detail?: any;
};

const WebsiteCountModal: React.FC<DexModalProps> = ({
  onClose,
  onDelete,
  onStatus,
  detail,
}) => {
  const [tag, setTag] = React.useState<any>('');
  const [existingTags, setExistingTags] = React.useState<any>(null);

  async function handleStatus() {
    if (onStatus && onClose) {
      await onStatus(detail?.id, tag);
      onClose();
    }
  }

  async function fetchExistingTags() {
    setExistingTags(null);
    await fetch(
      'https://client-backend-402017.el.r.appspot.com//tags/admin/getAll',
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
    fetchExistingTags();
  }, []);
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white text-black p-6 rounded-md max-w-[40vw] min-w-[40vw] min-h-[45vh] max-h-[45vh]'>
        <h2 className='text-xl font-bold mb-4'>Website Tagging</h2>
        <div className='flex my-4 justify-around'>
          <div className='mr-2'>
            <span className='font-semibold'>Website:</span> {detail?.website}
          </div>
          <div className='mr-2'>
            <span className='font-semibold'>Visits:</span>{' '}
            {detail?.visitorCounts}
          </div>
        </div>
        <div className='flex justify-center items-center overflow-auto flex-wrap overflow-y-auto h-24 p-1'>
          <span className='font-semibold'>Existing Tags: </span>
          {detail?.tags.map((tag: any, index: any) => (
            <span
              key={index}
              className='border m-1 p-1 border-blue-500'>
              {tag}
            </span>
          ))}
        </div>
        <div className='text-center'>
          <div className='flex justify-center items-center gap-4 mt-2'>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className='border-2 border-blue-500 p-1 rounded'>
              <option value=''>Select Tag</option>
              {existingTags &&
                existingTags.map((itag: string, index: number) => (
                  <option
                    key={index}
                    value={(itag as any).name}>
                    {(itag as any).name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className='my-4 flex justify-evenly'>
          <div className='mb-4'>
            <span className='font-semibold'>Status:</span> {detail?.status}
          </div>
          <div className='mb-4'>
            <span className='font-semibold'>Updated At:</span>{' '}
            {detail?.updatedAt.slice(0, 10)}
          </div>
        </div>
        <div className='flex justify-end'>
          <button
            className='px-4 py-2 bg-gray-300 rounded mr-2'
            onClick={onClose}>
            Close
          </button>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded mr-2'
            onClick={async () => {
              if (onDelete && onClose) {
                await onDelete(detail._id);
                onClose();
              }
            }}>
            Delete
          </button>
          <button
            className='bg-blue-500 text-white px-3 py-1 rounded'
            onClick={handleStatus}>
            {detail.status.toUpperCase() === 'UNTAGGED'
              ? 'Add Tag'
              : detail.status.toUpperCase() === 'TAGGED'
              ? 'Update Tag'
              : detail.status.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCountModal;
