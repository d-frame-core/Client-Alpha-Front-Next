/** @format */

'use client';
import React, { useContext, useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import { AppContext } from '@/context/context';
import Charts from '@/components/Charts';
import { useMediaQuery } from '@mui/material';
interface CompanyData {
  companyAddress1: string;
  companyAddress2: string;
  companyEmail: string;
  companyName: string;
  companyType: string;
  status: string;
  tags: string[]; // If tags are always an array of strings
  walletAddress: string;
  __v: number;
  _id: string;
  profileImage: string;
}

function DataPool() {
  const { setClientData, clientData } = useContext(AppContext);
  const [data, setData] = useState<CompanyData>();
  const [tagsData, setTagsData] = useState(null);
  const [selectedTagData, setSelectedTagData] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>('Crypto');

  const ma = useMediaQuery('(min-width:880px)');
  var h: number = 240;
  var w: number = 650;

  const handleTagClick = (tag: any) => {
    console.log(tag);
    setSelectedTagData(tag.websites);
  };

  useEffect(() => {
    // Retrieve the data from localStorage
    fetchData();
    const storedData =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('dframeClientData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      setClientData(parsedData);
    }
  }, []);

  async function fetchData() {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com/websites/admin/dataPool',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setTagsData(data);
          setSelectedTagData(data[0].websites);
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      {!tagsData && !selectedTagData && (
        <div className='text-black flex justify-center items-center m-auto h-[94vh] text-3xl'>
          **No Data Available**
        </div>
      )}
      <div className='flex overflow-x-auto bg-blue-300'>
        {tagsData &&
          (tagsData as any).map((tag: any) => (
            <div
              key={tag.tag}
              className={`cursor-pointer w-full text-center border px-2 py-1 ${
                selectedTag === tag
                  ? 'bg-white border-blue-900 border-2 text-black'
                  : ' bg-blue-200 text-black'
              }`}
              onClick={() => handleTagClick(tag)}>
              {tag.tag}
            </div>
          ))}
      </div>
      {selectedTagData && (
        <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 '>
          <p className='text-[28px]'>DataPool</p>
          <div className='mt-4 bg-white rounded-lg p-6 flex flex-col mb-8 min-h-[70vh]'>
            {/* Render your pie chart here using selectedDataset */}
            {Charts(selectedTagData as any[], 'visitorCounts', h, w, ma)}

            {(selectedTagData as any).length > 0 ? (
              <div className='bg-blue-200 text-sm w-full overflow-y-auto'>
                {selectedTagData &&
                  selectedTagData.map((item: any, index: any) => (
                    <div
                      className='md:py-3 py-5 border-b-2 border-gray-200 flex items-center justify-between md:px-20 px-2 md:text-sm text-xl'
                      key={index}>
                      <div>{item.name}</div>
                      <div>{item.visitorCounts} Times</div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className='w-full h-full flex justify-center items-center text-3xl'>
                **Minimum 6 hours of data needed**
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default withSidebarAndHeader(DataPool); // Call the HOC once to wrap the Profile component
