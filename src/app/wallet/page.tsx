/** @format */

'use client';
import React, { useContext, useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import axios from 'axios';
import { dframeABI, dframeAddress } from '../../utils/Utils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Web3 from 'web3';
import { AppContext } from '@/context/context';
import TransactionDetails from '@/components/TransactionDetails';
function Wallet() {
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
  }
  const [data, setData] = useState<CompanyData>();
  const [pastTransactions, setPastTransactions] = useState<any[] | never[]>([]);
  const [sendWalletAddress, setSendWalletAddress] = useState<any>('');
  const { clientData, setClientData } = useContext(AppContext);
  const [sendDFTAmount, setSendDFTAmount] = useState<any>('');

  const [walletBalance, setWalletBalance] = useState<String>('');
  async function fetchDataFromBackend() {
    await fetch(
      `https://client-backend-402017.el.r.appspot.com/wallet/past-transactions/${clientData.walletAddress}`,
      {
        method: 'GET',
        cache: 'force-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('showind wallet data', data);
        setPastTransactions((data as any).pastTransactions);
      })
      .catch((error) => console.log('error fetching waller', error));
  }
  function copyWalletAddress() {
    navigator.clipboard.writeText((data as any).walletAddress);
  }

  async function getBalance() {
    const web3 = new Web3(
      'https://polygon-mainnet.g.alchemy.com/v2/nHyM53VqfExPfPNYL5VLT1urCiUOunq_'
    );

    // get the DFT token contract instance
    const dframeContract = new web3.eth.Contract(
      dframeABI as any,
      dframeAddress
    );
    //  get the balance of DFRAME tokens for the specified wallet address
    const balance = await (dframeContract.methods as any)
      .balanceOf(clientData.walletAddress)
      .call();
    const balanceInEth = web3.utils.fromWei(balance, 'ether');

    const balanceInKFormat =
      Math.trunc((balanceInEth as any) / 1000).toString() + 'k';
    setWalletBalance(balanceInKFormat);
  }

  useEffect(() => {
    fetchDataFromBackend();
    getBalance();
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
  async function sendDFTFunction() {
    if (sendDFTAmount === '' || sendWalletAddress === '') {
      alert('Please enter the required fields');
      return;
    }

    const web3 = new Web3((window as any).ethereum);

    // set the contract address of the DFRAME token

    // get the DFRAME token contract instance
    const dframeContract = new web3.eth.Contract(
      dframeABI as any,
      dframeAddress
    );
    const amount = web3.utils.toWei(sendDFTAmount.toString(), 'ether');

    const tx = (dframeContract.methods as any)
      .transfer(sendWalletAddress, amount)
      .send({
        from: clientData.walletAddress,
      })
      .on('transactionHash', function (hash: any) {
        console.log('Transaction Hash:', hash);
      })
      .on('receipt', function (receipt: any) {
        console.log('Transaction Receipt:', receipt);
      })
      .on('confirmation', function (confirmationNumber: any, receipt: any) {
        console.log('Confirmation Number:', confirmationNumber);
        console.log('Transaction Receipt:', receipt);
      })
      .on('error', function (error: any) {
        console.log('Error:', error);
        alert('Error: ' + error.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });

    // wait for the tx on metamask to be completed then recall the getBalance function to update the balance and getpastevents function
    await tx;

    setTimeout(() => {
      setSendWalletAddress('');
      setSendDFTAmount('');
      fetchDataFromBackend();
    }, 1000);
  }
  return (
    <div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 h-[85vh] overflow-auto'>
        <p className='text-[28px]'>Wallet</p>
        <div className='flex md:flex-row flex-col justify-evenly '>
          <div className='bg-white p-3 rounded-lg md:w-2/5 mx-auto w-11/12 flex justify-center items-center flex-col'>
            <div className='md:text-xl text-3xl pb-2 border-b-2 border-gray-300 text-center w-full font-semibold'>
              Transactions
            </div>
            {pastTransactions && pastTransactions.length > 0 ? (
              <div className='border-b-2 border-gray-200 w-full text-lg text-center overflow-y-auto md:h-80 md:max-h-80 h-96 max-h-96'>
                {pastTransactions.map((event: any) => {
                  if (
                    event.returnValues.from.toString().toLowerCase() ===
                    clientData.walletAddress.toString().toLowerCase()
                  ) {
                    return (
                      <TransactionDetails
                        event={event}
                        sent={true}
                        key={event.transactionHash}
                      />
                    );
                  } else {
                    return (
                      <TransactionDetails
                        event={event}
                        sent={false}
                        key={event.transactionHash}
                      />
                    );
                  }
                })}
              </div>
            ) : (
              <div className='border-b-2 border-gray-200 w-full text-2xl flex justify-center items-center text-center h-80 max-h-80'>
                **No Past Transactions**
              </div>
            )}
          </div>
          <div className='md:w-2/5 w-11/12 flex flex-col mx-auto mt-12 md:mt-0 gap-8'>
            <div className='bg-white w-full text-center rounded-lg  flex-col py-4 md:text-lg text-2xl '>
              <div className='mb-4'>
                {' '}
                Wallet Balance :{' '}
                <span className='text-blue-700 font-semibold'>
                  {walletBalance} DFT
                </span>
              </div>
              <div className=''>
                {clientData?.walletAddress.slice(0, 8)}.........
                {clientData?.walletAddress.slice(-8, -1)}
                <ContentCopyIcon
                  className='ml-2 text-blue-400 text-lg cursor-pointer font-semibold'
                  onClick={copyWalletAddress}
                />
              </div>
            </div>
            <div className='bg-white w-full text-center rounded-lg flex-col py-3 md:text-sm text-xl'>
              <div className='md:text-xl text-3xl pb-2 border-b-2 border-gray-300 text-center w-full font-semibold'>
                Transfer Tokens
              </div>
              <div className='md:my-2 my-4 '>
                Wallet Address :
                <input
                  className='border-none w-4/5 bg-blue-200 rounded outline-none mx-auto p-1 pl-3 mt-2 shadow-lg'
                  onChange={(e) => setSendWalletAddress(e.target.value)}
                />
              </div>
              <div className='md:my-2 my-4 '>
                DFT Amount :
                <input
                  className='border-none w-4/5 bg-blue-200 rounded outline-none mx-auto p-1 pl-3 mt-2 shadow-lg'
                  onChange={(e) => setSendDFTAmount(e.target.value)}
                />
              </div>
              <div className='mt-4'>
                <button
                  className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={sendDFTFunction}>
                  Send DFT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withSidebarAndHeader(Wallet); // Call the HOC once to wrap the Profile component
