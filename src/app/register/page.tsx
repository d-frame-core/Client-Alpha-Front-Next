/** @format */

'use client';
import Modal from '@/components/RegisterModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Register = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyAddress1, setCompanyAddress1] = useState('');
  const [companyAddress2, setCompanyAddress2] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(): Promise<void> {
    const accounts: string[] = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });
    const walletAddress = accounts[0];

    await fetch('http://localhost:8080/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        companyName: companyName,
        companyType: companyType,
        companyEmail: companyEmail,
        companyAddress1: companyAddress1,
        companyAddress2: companyAddress2,
        walletAddress: walletAddress,
      }),
    })
      .then((response) => {
        console.log(response);

        //  typeof window !== 'undefined' &&
        //    window.localStorage.setItem('tokenForClient', response.data.token);
        //  typeof window !== 'undefined' &&
        //    window.localStorage.setItem('walletAddress', walletAddress);
        //  const data = response.data.user;
        //  typeof window !== 'undefined' &&
        //    window.localStorage.setItem('dframeClientData', JSON.stringify(data));
        //  router.push('/profile', { scroll: false });
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className=' h-screen flex flex-col gap-6 justify-center items-center bg-white text-black '>
      <div className='flex flex-col justify-center items-center gap-2'>
        <Image
          src={'/dframe.png'}
          width={80}
          height={80}
          alt='D Frame'
        />
        <div className='text-4xl font-semibold'>
          D Frame Client Registration Portal
        </div>
      </div>
      <form className='px-7 bg-white text-blue-600'>
        <div
          className='border-8 border-blue-500  p-8  rounded grid gap-6 bg-blue-100'
          id='form'>
          <div className='w-full flex gap-3'>
            <input
              className='capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black'
              type='text'
              placeholder='Company Name'
              id='Company-Name'
              name='Company-Name'
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className='w-full flex gap-3'>
            <input
              className='p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]'
              type='email'
              placeholder='Company Email'
              id='Company-Email'
              name='Company-Email'
              required
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
          </div>
          <div className='w-full flex gap-3'>
            <input
              className='p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]'
              type='text'
              placeholder='Company Address Line 1'
              id='Company-Address1'
              name='Company-Address1'
              required
              value={companyAddress1}
              onChange={(e) => setCompanyAddress1(e.target.value)}
            />
            <input
              className='p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]'
              type='text'
              placeholder='Company Address Line 2'
              id='Company-Address2'
              name='Company-Address2'
              value={companyAddress2}
              onChange={(e) => setCompanyAddress2(e.target.value)}
            />
          </div>
          <div className='w-full flex gap-3'>
            <input
              className='p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]'
              type='text'
              placeholder='Company Type'
              id='Company-Type'
              name='Company-Type'
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            />
            {/* <input
              className='p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]'
              type='tel'
              placeholder='Company Phone Number'
              id='Company-PhoneNumber'
              name='Company-PhoneNumber'
              value={companyPhoneNumber}
              onChange={(e) => setCompanyPhoneNumber(e.target.value)}
            />
            <button
              className='bg-white rounded hover:bg-[#035ec5] hover:text-white outline-none glass shadow-2xl  p-3  font-bold'
              type='button'
              onClick={() => setShowModal(true)}>
              Verify
            </button> */}
          </div>
          <button
            className='bg-white rounded hover:bg-[#035ec5] hover:text-white outline-none glass shadow-2xl  w-full p-3    font-bold'
            type='submit'
            onClick={handleSubmit}>
            Submit
          </button>

          {showModal && (
            <Modal
              onClose={() => setShowModal(false)}
              phone={companyPhoneNumber}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
