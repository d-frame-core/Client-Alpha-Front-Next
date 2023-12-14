/** @format */
'use client';
import React, { createContext, useState } from 'react';

const AppContext = createContext();

function AppContextProvider(props) {
  const [toggleTab, setToggleTab] = useState('profile');
  const [clientWalletAddress, setClientWalletAddress] = useState('');
  const [clientData, setClientData] = useState(null);
  const [clientToken, setClientToken] = useState('');
  const [clientId, setClientId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        toggleTab,
        setToggleTab,
        clientWalletAddress,

        clientData,

        clientToken,

        clientId,
        setClientWalletAddress,
        setClientData,
        setClientToken,
        setClientId,
        isOpen,
        setIsOpen,
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
