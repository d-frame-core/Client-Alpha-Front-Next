/** @format */
'use client';
import { useState } from 'react';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleVerifyPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerifyPassword(e.target.value);
  };

  const handleLogin = () => {
    // Logic for login/authentication goes here
    // You can use 'password' and 'verifyPassword' states for authentication
    console.log('Logging in...');
  };

  return (
    <div className='flex h-screen justify-center items-center bg-white'>
      <div className='w-1/2 bg-blue-300 p-8 rounded-lg'>
        <div className='max-w-md mx-auto'>
          <h2 className='text-3xl font-semibold text-white mb-6'>
            Admin Login
          </h2>

          <button className='bg-white text-blue-500 hover:text-white hover:bg-blue-500 py-2 px-4 rounded-md mb-4'>
            Verify OTP
          </button>

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            className='w-full p-2 rounded-md mb-4 text-black'
          />

          <input
            type='password'
            placeholder='Verify Password'
            value={verifyPassword}
            onChange={handleVerifyPasswordChange}
            className='w-full p-2 rounded-md mb-4 text-black'
          />

          <button
            onClick={handleLogin}
            className='bg-white text-blue-500 hover:text-white hover:bg-blue-500 py-2 px-4 rounded-md'>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
