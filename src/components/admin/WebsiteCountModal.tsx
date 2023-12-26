/** @format */

import React from 'react';

type DexModalProps = {
  onClose?: () => void;
  onDelete?: (id: string) => void;
  onStatus?: (id: string, tags: string[]) => void;
  detail?: any;
};

const WebsiteCountModal: React.FC<DexModalProps> = ({
  onClose,
  onDelete,
  onStatus,
  detail,
}) => {
  const [tags, setTags] = React.useState<string[]>([]);
  const [tag, setTag] = React.useState<string>('');

  async function handleStatus() {
    if (onStatus && onClose) {
      await onStatus(detail?.id, tags);
      onClose();
    }
  }
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
          {tags.map((tag, index) => (
            <span
              key={index}
              className='mx-1'>
              {tag}
            </span>
          ))}
          <div className='flex justify-center items-center gap-4 mt-2'>
            <input
              type='text'
              className='border-2 border-blue-500 p-1 rounded'
              placeholder='Add Tag'
              onChange={(e) => {
                setTag(e.target.value);
              }}
              value={tag}
            />
            <button
              className='bg-blue-500 text-white p-1 rounded'
              onClick={async () => {
                setTag('');
                if (tag) {
                  setTags([...tags, tag]);
                }
              }}>
              Add
            </button>
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
