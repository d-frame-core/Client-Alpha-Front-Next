/** @format */

'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
interface Window {
  ethereum: any;
  localStorage: Storage;
}

export default function Middleware() {
  const router = useRouter();
  // function to connect to polygon mainnet here.
  const connectToPolygonMainnet = async () => {
    if ((window as any).ethereum) {
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      // Check if connected to a different network (not Polygon mainnet)
      if (chainId !== '0x89') {
        // ChainId of Polygon mainnet is '0x89'
        try {
          (await typeof window) !== 'undefined' &&
            window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x89' }],
            });
        } catch (error) {
          // Handle error
          console.log('Error while switching to Polygon mainnet:', error);
        }
      }
    } else {
      // Handle case where window.ethereum is not available (e.g., Metamask is not installed)
      console.log('Metamask not available');
    }
  };

  const checkMetamaskConnection = () => {
    if (typeof window !== 'undefined' && !window.ethereum?.selectedAddress) {
      // Metamask wallet disconnected, redirect to root route
      router.push('/');
    }
  };

  const handleWalletDisconnect = () => {
    if (
      typeof window !== 'undefined' &&
      !(window as any).ethereum?.selectedAddress
    ) {
      // Metamask wallet disconnected
      router.push('/');
    }
  };

  useEffect(() => {
    // Listen for changes in the selected address property
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleWalletDisconnect);
    }
  }, [(typeof window !== 'undefined' && (window as any)).ethereum]);
  useEffect(() => {
    connectToPolygonMainnet();
    checkMetamaskConnection();
  }, []);
  return null;
}
