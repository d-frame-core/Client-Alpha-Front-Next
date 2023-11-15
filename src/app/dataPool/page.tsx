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
  const [selectedTag, setSelectedTag] = useState<string | null>('Crypto');

  const tags = [
    'Crypto',
    'Tech',
    'Travel',
    'Food',
    'Sports',
    'Fashion',
    'Music',
    'Health',
    'Science',
    'Gaming',
  ];
  const ma = useMediaQuery('(min-width:880px)');
  var h: number = 240;
  var w: number = 650;
  const generateRandomData = (tag: string, count: number) => {
    const data = [];
    const domainList = getDomainList(tag);

    for (let i = 0; i < count; i++) {
      const name = domainList[i % domainList.length];
      const visits = Math.floor(Math.random() * 100) + 1; // Random visits between 1 and 100
      data.push({ name, visits });
    }
    return data;
  };

  const getDomainList = (tag: string): string[] => {
    switch (tag) {
      case 'Crypto':
        return [
          'binance.com',
          'mexc.com',
          'kraken.com',
          'bitfinex.com',
          'gemini.com',
        ];
      case 'Tech':
        return [
          'techcrunch.com',
          'wired.com',
          'theverge.com',
          'arstechnica.com',
          'engadget.com',
        ];
      case 'Travel':
        return [
          'expedia.com',
          'booking.com',
          'airbnb.com',
          'tripadvisor.com',
          'kayak.com',
        ];
      case 'Food':
        return [
          'foodnetwork.com',
          'allrecipes.com',
          'epicurious.com',
          'yummly.com',
          'chowhound.com',
        ];
      case 'Sports':
        return ['espn.com', 'nba.com', 'nfl.com', 'mlb.com', 'fifa.com'];
      case 'Fashion':
        return [
          'vogue.com',
          'elle.com',
          'harpersbazaar.com',
          'gq.com',
          'fashionista.com',
        ];
      case 'Music':
        return [
          'spotify.com',
          'applemusic.com',
          'pandora.com',
          'soundcloud.com',
          'tidal.com',
        ];
      case 'Health':
        return [
          'webmd.com',
          'mayoclinic.org',
          'healthline.com',
          'verywellhealth.com',
          'cdc.gov',
        ];
      case 'Science':
        return [
          'sciencemag.org',
          'nationalgeographic.com',
          'scientificamerican.com',
          'nature.com',
          'sciencenews.org',
        ];
      case 'Gaming':
        return [
          'ign.com',
          'gamespot.com',
          'polygon.com',
          'kotaku.com',
          'eurogamer.net',
        ];
      default:
        return [];
    }
  };

  // Map tags to corresponding datasets
  const datasets = tags.map((tag) => ({
    tag,
    data: generateRandomData(tag, 5),
  }));

  // Filter the selected dataset based on the selected tag
  const selectedDataset = selectedTag
    ? datasets.find((dataset) => dataset.tag === selectedTag)?.data || []
    : [];

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    // Retrieve the data from localStorage
    const storedData = localStorage.getItem('dframeClientData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      setClientData(parsedData);
    }
  }, []);
  console.log(datasets);
  return (
    <div>
      <div className='flex overflow-x-auto bg-blue-300'>
        {tags.map((tag) => (
          <div
            key={tag}
            className={`cursor-pointer w-full text-center border px-2 py-1 ${
              selectedTag === tag
                ? 'bg-white border-blue-900 border-2 text-black'
                : ' bg-blue-200 text-black'
            }`}
            onClick={() => handleTagClick(tag)}>
            {tag}
          </div>
        ))}
      </div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 '>
        <p className='text-[28px]'>DataPool</p>
        <div className='mt-4 bg-white rounded-lg p-6 flex flex-col mb-8 min-h-[70vh]'>
          {/* Render your pie chart here using selectedDataset */}
          {Charts(selectedDataset as any[], 'visits', h, w, ma)}

          {selectedDataset.length > 0 ? (
            <div className='bg-blue-200 text-sm w-full overflow-y-auto'>
              {selectedDataset &&
                selectedDataset.map((item: any) => (
                  <div className='md:py-3 py-5 border-b-2 border-gray-200 flex items-center justify-between md:px-20 px-2 md:text-sm text-xl'>
                    <div>{item.name}</div>
                    <div>{item.visits} Times</div>
                  </div>
                ))}
            </div>
          ) : (
            <div className='w-full h-full flex justify-center items-center text-3xl'>
              **Minimum 6 hours of data needed**
            </div>
          )}
        </div>
        {/* Additional content */}
      </div>
    </div>
  );
}

export default withSidebarAndHeader(DataPool); // Call the HOC once to wrap the Profile component
