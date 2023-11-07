"use client"
import React, {useState} from 'react';
import { Button } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()

  async function connectWallet(): Promise<void> {
    try {
      const accounts: string[] = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      const address = accounts[0];
      const response = await axios.post('https://client-backend-402017.el.r.appspot.com/users/login', {
        walletAddress: address,
      });
      if (response.data.message === 'No address found please Signup'){
        router.push('/register', { scroll: false })
      }
      else {
        localStorage.setItem('tokenForClient', response.data.token);
        localStorage.setItem('walletAddress', address);
        const data = response.data.user;
        localStorage.setItem('dframeClientData', JSON.stringify(data));
        router.push('/profile', { scroll: false })
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className='text-center'>
        <img src="dframe.png" className='mx-auto'/>
      <p className='text-[52px] mt-6'>Welcome to D Frame</p>
      <p className=' text-[32px] mt-8'>Login with Metamask</p>
      <div className='mt-10'>
        <Button variant="contained" className='bg-blue-400' onClick={connectWallet}>
          <img src="./metamask.gif" className='w-16 rounded-full ml-4'/><span className='mx-4 text-[20px]'>Connect</span>
        </Button>
      </div>
      </div>
    </main>
  )
}
