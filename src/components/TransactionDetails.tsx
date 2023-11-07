/** @format */

import React from 'react';
import Web3 from 'web3';
interface KYC1DetailsProps {
  event: any;
  sent: boolean;
}

const TransactionDetails: React.FC<KYC1DetailsProps> = ({ event, sent }) => {
  return (
    <div
      className='bg-blue-100 hover:bg-blue-300 w-11/12 mx-auto my-4 py-2 px-1 rounded cursor-pointer'
      key={event.transactionHash}>
      <a
        href={'https://polygonscan.com/tx/' + event.transactionHash}
        target='_blank'>
        <div className='flex justify-between px-2 md:text-sm text-xl'>
          {sent ? (
            <div>
              To: {event.returnValues.to.slice(0, 5)}
              ....
              {event.returnValues.to.slice(-5)}
            </div>
          ) : (
            <div>
              From: {event.returnValues.to.slice(0, 4)}
              ....
              {event.returnValues.to.slice(-4)}
            </div>
          )}
          <div>
            {' '}
            On:{' '}
            {new Date(Number(event.timestamp) * 1000).toLocaleDateString(
              'en-US',
              {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit',
              }
            )}
          </div>
        </div>
        <div className='flex mt-2 justify-between px-3 md:text-xs text-lg'>
          <div className='text-blue-800 font-semibold'>
            {(Web3.utils.fromWei(event.returnValues.value, 'ether') as any) >=
            1000
              ? (Web3.utils.fromWei(event.returnValues.value, 'ether') as any) /
                  1000 +
                'K'
              : Web3.utils.fromWei(event.returnValues.value, 'ether')}{' '}
            DFT
          </div>
          <div>
            {' '}
            At:
            {new Date(Number(event.timestamp) * 1000).toLocaleTimeString(
              undefined,
              {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              }
            )}
          </div>
          {sent ? (
            <div className='text-red-500 font-semibold'>SENT</div>
          ) : (
            <div className='text-green-600 font-semibold'>RECEIVED</div>
          )}
        </div>
      </a>
    </div>
  );
};

export default TransactionDetails;
