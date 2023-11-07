"use client"
import React, { useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface State extends SnackbarOrigin {
  open: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Profile() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 min-h-[85vh] '>
        <p className='text-[28px]'>Settings </p>
          <div className='mx-20 flex flex-col mt-8 justify-around h-[68vh]'>
              <div className='flex '>
                <p className='my-auto w-[24%] text-[24px]'>Theme</p>
                <p className='my-auto w-[2%] text-[24px]'>:</p>
                <div><Switch {...label} disabled className='cursor-not-allowed'/></div>
              </div>
              <div className='flex '>
                <p className='my-auto w-[24%] text-[24px]'>Clear Ad History</p>
                <p className='my-auto w-[2%] text-[24px]'>:</p>
                <Button variant="contained" color="error" onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
                  Delete Ad History
                </Button>
              </div>
              <div className='flex '>
                <p className='my-auto w-[24%] text-[24px]'>Clear Survey History</p>
                <p className='my-auto w-[2%] text-[24px]'>:</p>
                <Button variant="contained" color="error" onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
                  Delete Survey History
                </Button>
              </div>
              <div className='flex '>
                <p className='my-auto w-[24%] text-[24px]'>Notification</p>
                <p className='my-auto w-[2%] text-[24px]'>:</p>
                <div><Switch {...label} disabled className='cursor-not-allowed'/></div>
              </div>
          </div>
          <Snackbar 
          anchorOrigin={{ vertical, horizontal }}
          open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Deleted Successfully!
            </Alert>
          </Snackbar>
      </div>
    </div>
  );
}

export default withSidebarAndHeader(Profile); // Call the HOC once to wrap the Profile component
