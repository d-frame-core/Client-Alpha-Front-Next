/** @format */

'use client';
import React, { useContext, useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import { dframeABI, dframeAddress } from '../../utils/Utils';
import Web3 from 'web3';
import { AppContext } from '@/context/context';
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
  const [buyDFTModal, setBuyDFTModal] = useState(false);
  const [amountToBuy, setAmountToBuy] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [pastTransactions, setPastTransactions] = useState<any[] | never[]>([]);
  const [sendWalletAddress, setSendWalletAddress] = useState<any>('');
  const { clientData, setClientData } = useContext(AppContext);
  const [sendDFTAmount, setSendDFTAmount] = useState<any>('');
  const [toggleMenu, setToggleMenu] = useState('active');

  const [walletBalance, setWalletBalance] = useState<String>('');

  const handleChange = (e: any) => {
    const value = e.target.value;
    // check the if statement that the value is ONLY between 0-9, no decimals, no spaces, nothing EXCEPT 0-9

    if (value.match(/^[0-9]*$/gm)) {
      setAmountToBuy(value);
    } else {
      // throw alert of invalid input
      alert('Invalid input');
      setAmountToBuy('');
    }
  };
  async function fetchDataBackend() {
    await fetch('http://localhost:8080/transaction/pending', {
      method: 'GET',
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((data) => {
        // setData(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }

  async function fetchHistory() {
    await fetch(`http://localhost:8080/transaction/client/${data?._id}`, {
      method: 'GET',
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((data) => {
        // setData(data);
        console.log('history is', data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    fetchDataBackend();
    fetchHistory();
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

  console.log('cliend data', clientData);
  async function sendDFTFunction() {
    if (sendDFTAmount === '' || sendWalletAddress === '') {
      alert('Please enter the required fields');
      return;
    }
    if (sendDFTAmount === '' || sendWalletAddress === '') {
      alert('Please enter the required fields');
      return;
    }

    if (parseFloat(sendDFTAmount) > parseFloat(walletBalance as any)) {
      alert('Send DFT amount cannot exceed wallet balance');
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
        from: clientData?.walletAddress,
        gasPrice: web3.utils.toWei('1000', 'gwei'),
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
    }, 1000);
  }

  const handleOptionChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 470,
    height: 300,
    bgcolor: 'white',
    boxShadow: 24,
    border: '0',
    p: 3,
    borderRadius: '1.1vh',
    overflow: 'hidden',
    color: 'black',
  };
  return (
    <div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 h-[85vh] overflow-auto'>
        <div className='flex justify-between mb-8 mt-3'>
          <p className='text-[28px]'>p2p DFT Exchange</p>
        </div>
        <div className='flex flex-col p-3 rounded-lg w-11/12 mx-auto mt-16 bg-white h-[33rem] overflow-y-auto justify-start gap-6 items-center'>
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
        </div>
      </div>
    </div>
  );
}

export default withSidebarAndHeader(Wallet); // Call the HOC once to wrap the Profile component
