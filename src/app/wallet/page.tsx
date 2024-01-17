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
import { Box, Divider, Modal, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState<CompanyData>();
  const [buyDFTModal, setBuyDFTModal] = useState(false);
  const [amountToBuy, setAmountToBuy] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [pastTransactions, setPastTransactions] = useState<any[] | never[]>([]);
  const [sendWalletAddress, setSendWalletAddress] = useState<any>('');
  const { clientData, setClientData } = useContext(AppContext);
  const [sendDFTAmount, setSendDFTAmount] = useState<any>('');

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
  async function fetchDataFromBackend() {
    await fetch(
      `https://client-backend-402017.el.r.appspot.com/wallet/past-transactions/${clientData?.walletAddress}`,
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
    alert('Copied Wallet Address');
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
    if (clientData) {
      const balance = await (dframeContract.methods as any)
        .balanceOf(clientData.walletAddress)
        .call();
      const balanceInEth = web3.utils.fromWei(balance, 'ether');

      const balanceInKFormat =
        Math.trunc((balanceInEth as any) / 1000).toString() + 'k';
      setWalletBalance(balanceInKFormat);
    }
  }
  function buyDFTMail() {
    // Rishabhkapoor8711@gmail.com
    if (!amountToBuy || !paymentMethod) {
      alert('Please enter the required fields');
      return;
    }
    const email = 'Rishabhkapoor8711@gmail.com';
    const subject = encodeURIComponent('I want to buy DFT Tokens');
    const body = encodeURIComponent(
      `Client Name:- ${clientData?.companyName}\nClient Address:-${clientData?.walletAddress}\nClient Balance:-${walletBalance} DFT\nClient Email:-${clientData?.companyEmail}\n....................................................................\n....................................................................\nI want to buy DFT worth ${amountToBuy}$ \nMy preferred payment method(FIAT/CRYPTO) is ${paymentMethod}\n...............................`
    );
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    setBuyDFTModal(false);
    setAmountToBuy('');
    setPaymentMethod('');
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
      fetchDataFromBackend();
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
          <p className='text-[28px]'>Wallet</p>
          <button
            className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            // onclick to redirect to the buy DFT page
            onClick={() => setBuyDFTModal(true)}>
            Buy DFT
          </button>
        </div>
        <div className='flex md:flex-row flex-col justify-evenly '>
          <div className='bg-white p-3 rounded-lg md:w-2/5 mx-auto w-11/12 flex justify-center items-center flex-col'>
            <div className='md:text-xl text-3xl pb-2 border-b-2 border-gray-300 text-center w-full font-semibold'>
              Transactions
            </div>
            {pastTransactions && pastTransactions.length > 0 ? (
              <div className='border-b-2 border-gray-200 w-full text-lg text-center overflow-y-auto md:h-[22rem] md:max-h-[22rem] h-96 max-h-96'>
                {pastTransactions.map((event: any) => {
                  if (
                    event.returnValues.from.toString().toLowerCase() ===
                    clientData?.walletAddress.toString().toLowerCase()
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
            <div className='bg-white w-full text-center rounded-lg  md:text-sm text-xl h-72 flex flex-col gap-3'>
              <div className='md:text-xl text-3xl py-2 border-b-2 border-gray-300 text-center w-full font-semibold'>
                Transfer Tokens
              </div>
              <div className='md:my-2 my-4 flex flex-col '>
                <div>Wallet Address :</div>
                <input
                  className='border-none w-4/5 bg-blue-200 rounded outline-none mx-auto p-1 pl-3 mt-2 shadow-lg'
                  onChange={(e) => setSendWalletAddress(e.target.value)}
                />
              </div>
              <div className='md:my-2 my-4 flex flex-col '>
                <div>DFT Amount :</div>
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
      <Modal
        open={buyDFTModal}
        onClose={() => setBuyDFTModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style2}>
          <h1 style={{ textAlign: 'center', margin: 0, marginBottom: '1vh' }}>
            1 DFT = $0.1
          </h1>
          <Divider />
          <TextField
            id='standard-basic'
            label='Total USD you want to BUY'
            variant='standard'
            sx={{ left: '2vw', width: '90%' }}
            {...register('amountToBuy')}
            onChange={handleChange}
            required
            value={amountToBuy}
            style={{
              margin: '1vh 0',
            }}
          />
          {amountToBuy !== '' && (
            <p
              style={{
                textAlign: 'center',
                margin: '1vh 0',
              }}>
              You will get {Number(amountToBuy) * 10} DFT for ${amountToBuy}
            </p>
          )}
          <div className='flex flex-col gap-1 mt-2 items-center font-semibold'>
            Payment Method:
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <label className='text-blue-400'>
                <input
                  type='radio'
                  value='FIAT'
                  checked={paymentMethod === 'FIAT'}
                  onChange={handleOptionChange}
                  className='text-blue-400'
                />
                FIAT
              </label>

              <label
                style={{ marginLeft: '20px' }}
                className='text-blue-400'>
                <input
                  type='radio'
                  value='CRYPTO'
                  checked={paymentMethod === 'CRYPTO'}
                  onChange={handleOptionChange}
                  className='text-blue-400'
                />
                CRYPTO
              </label>
            </div>
          </div>
          <p className='text-center my-3'>
            **DO NOT CHANGE any information in the mail body**
          </p>
          <button
            className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={buyDFTMail}>
            Send Mail
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default withSidebarAndHeader(Wallet); // Call the HOC once to wrap the Profile component
