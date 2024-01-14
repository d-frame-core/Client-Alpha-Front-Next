/** @format */

// /** @format */
'use client';
import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// const LoginPage = () => {
//   const [password, setPassword] = useState('');
//   const [verifyPassword, setVerifyPassword] = useState('');

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleVerifyPasswordChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setVerifyPassword(e.target.value);
//   };

//   const handleLogin = () => {
//     // Logic for login/authentication goes here
//     // You can use 'password' and 'verifyPassword' states for authentication
//     console.log('Logging in...');
//   };

//   return (
//     <div className='flex h-screen justify-center items-center bg-white'>
//       <div className='w-1/2 bg-blue-300 p-8 rounded-lg'>
//         <div className='max-w-md mx-auto'>
//           <h2 className='text-3xl font-semibold text-white mb-6'>
//             Admin Login
//           </h2>

//           <button className='bg-white text-blue-500 hover:text-white hover:bg-blue-500 py-2 px-4 rounded-md mb-4'>
//             Verify OTP
//           </button>

//           <input
//             type='password'
//             placeholder='Password'
//             value={password}
//             onChange={handlePasswordChange}
//             className='w-full p-2 rounded-md mb-4 text-black'
//           />

//           <input
//             type='password'
//             placeholder='Verify Password'
//             value={verifyPassword}
//             onChange={handleVerifyPasswordChange}
//             className='w-full p-2 rounded-md mb-4 text-black'
//           />

//           <button
//             onClick={handleLogin}
//             className='bg-white text-blue-500 hover:text-white hover:bg-blue-500 py-2 px-4 rounded-md'>
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// components/AuthComponent.tsx

import { useState, useEffect } from 'react';

const AuthComponent: React.FC = () => {
  const router = useRouter();
  const staticWalletAddress = 'YOUR_STATIC_WALLET_ADDRESS';

  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  // useEffect(() => {
  //   // Check if the wallet is connected using window.ethereum
  //   const checkWallet = async () => {
  //     if (window.ethereum) {
  //       try {
  //         // Request accounts from Metamask
  //         const accounts = await window.ethereum.request({
  //           method: 'eth_accounts',
  //         });

  //         // Check if connected wallet address matches the staticWalletAddress
  //         if (accounts.length > 0 && accounts[0] === staticWalletAddress) {
  //           // Wallet address matches, do nothing (user can proceed)
  //         } else {
  //           // Wallet address does not match, redirect to /profile
  //           router.push('/profile');
  //         }
  //       } catch (error) {
  //         console.error('Error checking wallet:', error);
  //       }
  //     } else {
  //       // Metamask not installed or not connected, redirect to /profile
  //       router.push('/profile');
  //     }
  //   };

  //   checkWallet();
  // }, []);

  const handleSendOTP = () => {
    // Add logic to send OTP
    console.log('Sending OTP...');
  };

  const handleVerify = () => {
    // Add logic to verify OTP
    console.log('Verifying OTP...');
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded shadow-md text-black'>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-600'>
            Password
          </label>
          <input
            type='text'
            id='password'
            className='mt-1 p-2 w-full border rounded-md'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='otp'
            className='block text-sm font-medium text-gray-600'>
            OTP
          </label>
          <input
            type='text'
            id='otp'
            className='mt-1 p-2 w-full border rounded-md'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <button
            onClick={handleSendOTP}
            className='bg-blue-500 text-white px-4 py-2 rounded'>
            Send OTP
          </button>
        </div>
        <div>
          <button
            onClick={handleVerify}
            className='bg-green-500 text-white px-4 py-2 rounded'>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
