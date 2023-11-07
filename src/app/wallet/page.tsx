"use client"
import React, { useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import axios from 'axios';

function LearnMore() {
   const [learnData, setLearnData] = useState([]);
  async function fetchDataFromBackend() {
    await axios
      .get('https://client-backend-402017.el.r.appspot.com/Learnmore/readLearnMore')
      .then((res) => {
        setLearnData(res.data);
        console.log("showind Learn data",res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    fetchDataFromBackend();
  }, []);


  return (
    <div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 h-[85vh] overflow-auto'>
        <p className='text-[28px]'>Learn More </p>
        <div  className='mt-4 bg-white rounded-lg p-6 cursor-pointer'>
          <p className='text-lg font-semibold'>hello</p>
        </div>
      </div>
    </div>
  );
}

export default withSidebarAndHeader(LearnMore); // Call the HOC once to wrap the Profile component
