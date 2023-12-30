/** @format */

'use client';
import React, { useContext, useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import { AppContext } from '@/context/context';
import { Cancel } from '@mui/icons-material';
function Wallet() {
  interface CompanyData {
    companyAddress1: string;
    companyAddress2: string;
    companyEmail: string;
    companyName: string;
    companyType: string;
    status: string;
    tags: string[];
    walletAddress: string;
    __v: number;
    _id: string;
  }
  const [data, setData] = useState<CompanyData>();
  const { clientData, setClientData } = useContext(AppContext);
  const [activeData, setActiveData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [activeBid, setActiveBid] = useState(null);

  const [toggleMenu, setToggleMenu] = useState('active');
  async function fetchDataBackend() {
    await fetch(
      'https://client-backend-402017.el.r.appspot.com//transaction/pending',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // setData(data);
        setActiveData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  async function fetchHistory() {
    if (data) {
      await fetch(
        `https://client-backend-402017.el.r.appspot.com//transaction/client-history/${data._id}`,
        {
          method: 'GET',
          cache: 'no-cache',
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // setData(data);
          console.log('history is', data);
          setHistoryData(data);
        })
        .catch((error) => console.log(error));
    }
  }

  async function fetchClientactiveBid() {
    if (data) {
      console.log(data._id);
      await fetch(
        `https://client-backend-402017.el.r.appspot.com//transaction/active/${data._id}`,
        {
          method: 'GET',
          cache: 'no-cache',
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // setData(data);
          console.log('active bids is', data);
          setActiveBid(data);
        })
        .catch((error) => console.log(error));
    }
  }
  useEffect(() => {
    fetchDataBackend();
    fetchHistory();
    fetchClientactiveBid();
  }, [data, clientData]);

  useEffect(() => {
    // Retrieve the data from localStorage
    const storedData =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('dframeClientData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      setClientData(parsedData);
    }
  }, []);

  async function handleStatusChange(id: any) {
    console.log('transaction id is', id);
    if (data) {
      await fetch(
        `https://client-backend-402017.el.r.appspot.com//transaction/transaction/update/${data._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionId: id,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // setData(data);
          console.log('active bids is', data);
          fetchDataBackend();
          fetchHistory();
          fetchClientactiveBid();
        })
        .catch((error) => console.log(error));
    }
  }

  async function handleCancelBid(id: any) {
    if (data) {
      await fetch(
        `https://client-backend-402017.el.r.appspot.com//transaction/cancel/${data._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionId: id,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // setData(data);
          console.log('cancelled bid is', data);
          fetchDataBackend();
          fetchHistory();
          fetchClientactiveBid();
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 h-[85vh] overflow-auto'>
        <div className='flex justify-between mb-8 mt-3'>
          <p className='text-[28px]'>p2p DFT Exchange</p>
          {activeBid && (
            <div className='bg-white px-4 mr-6 py-2 rounded'>
              <div className='text-center font-semibold text-xl'>
                Your Active Bid:{' '}
              </div>

              <div className='flex gap-4'>
                <div>
                  <span className='font-semibold'>Amount: </span>
                  {(activeBid as any).amount} DFT
                </div>
                <div>
                  <span className='font-semibold'> From: </span>
                  {(activeBid as any).from.slice(0, 4)}....
                  {(activeBid as any).from.slice(-4)}
                </div>
              </div>
              <div className='flex gap-4 items-center mt-2'>
                <div>
                  <span className='font-semibold'>Created At: </span>
                  {(activeBid as any).createdAt.slice(0, 10)}
                </div>
                <button
                  className=' text-red-500 -mt-1'
                  onClick={() => handleCancelBid((activeBid as any)._id)}>
                  Cancel <Cancel />{' '}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col p-3 rounded-lg w-11/12 mx-auto mt-16 bg-white h-[33rem] justify-start gap-6 items-center'>
          <div className='text-2xl font-semibold mt-4'>DFT Listings</div>
          <div className='flex h-14 items-center justify-center text-xl w-full'>
            <div
              className={`w-[40%] border flex items-center justify-center cursor-pointer h-full ${
                toggleMenu === 'active'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('active')}>
              Active
            </div>
            <div
              className={`w-[40%] border flex items-center justify-center cursor-pointer h-full ${
                toggleMenu === 'history'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('history')}>
              History
            </div>
          </div>
          <div className='h-80 border border-red-900 overflow-y-auto w-3/4 mx-auto'>
            {toggleMenu === 'active' ? (
              <div className='flex text-xl justify-center'>
                {activeData && (activeData as any).length > 0 ? (
                  (activeData as any).map((item: any) => (
                    <div
                      key={item._id}
                      className='flex items-center justify-center my-4 text-xl gap-12 font-semibold'>
                      <p className='text-blue-500'>
                        {`${item.from} listed ${item.amount} DFT on ${new Date(
                          item.createdAt
                        ).toLocaleDateString()}`}
                      </p>
                      <button
                        className=' bg-black text-white px-4 py-1 rounded-lg text-sm'
                        onClick={() => handleStatusChange(item._id)}>
                        I am Interested
                      </button>
                    </div>
                  ))
                ) : (
                  <div className='flex justify-center items-center mt-32'>
                    <p className='text-2xl font-semibold'>NO Active Listings</p>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex text-xl justify-center'>
                {historyData && (historyData as any).length > 0 ? (
                  (historyData as any).map((item: any) => (
                    <div
                      key={item._id}
                      className='flex items-center my-4 text-xl gap-14 font-semibold'>
                      <p className='text-blue-500'>
                        {`You bought ${item.amount} DFT from ${
                          item.from
                        } on ${new Date(item.updatedAt).toLocaleDateString()}`}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className='flex justify-center items-center mt-32'>
                    <p className='text-2xl font-semibold'>NO HISTORY</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withSidebarAndHeader(Wallet); // Call the HOC once to wrap the Profile component
