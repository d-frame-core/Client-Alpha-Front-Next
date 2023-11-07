"use client"
import React, { useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  Modal,
} from '@mui/material';

function Profile() {
  const [faqData, setFaqData] = React.useState<any[]>([]);
  const [helpdata, setHelpData] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [openDetail, setOpenDetail] = React.useState(false);
  const [selected,setSelected]=useState<any>({});
  
  function handleClickOpen (index:number) {
    setOpenDetail(true);
    setSelected(helpdata[index]);
    console.log(index)
   
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function fetchDataFromBackend() {
    await axios
      .get('https://client-backend-402017.el.r.appspot.com/Help/userHelp/getAllHelp')
      .then((res) => {
        setHelpData(res.data);
        setSelected(res.data[0])
        console.log("showind help data",res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function fetchFAQs() {
    await axios
      .get('https://client-backend-402017.el.r.appspot.com/F&Q/userFAQ/getAllFAQ')
      .then((res) => {
        setFaqData(res.data);
        console.log("showind faq data",res.data)

      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchDataFromBackend();
    fetchFAQs();
  }, []);


  return (
    <div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 min-h-[85vh] '>
        <p className='text-[28px]'>Help </p>
          {
            helpdata.map((singleHelp,index)=>(
              <div key={index} className='mt-4 bg-white rounded-lg p-6 cursor-pointer' onClick={()=>handleClickOpen(index)}>
                <p className='text-lg font-semibold'>{singleHelp.title}</p>
              </div>
            ))
          }
          <div className='mt-4 bg-white rounded-lg p-6 cursor-pointer' onClick={()=>setOpen(true)}>
            <p className='text-lg font-semibold'>FAQ's</p>
          </div>
      </div>
           <Dialog
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby='scroll-dialog-title'
              aria-describedby='scroll-dialog-description'>
              <DialogTitle>FAQs</DialogTitle>
              <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                  id='scroll-dialog-description'
                  >
                    {faqData.map((item,index) => (
                      <div>
                        <strong>
                          {item.question}
                          <br />
                        </strong>
                        <Divider />
                        {item.answer}
                        <br />
                        <br />
                      </div>
                  ))}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  onClick={handleClose}
                  className='btncl1'>
                  Close
                </button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openDetail}
              onClose={handleCloseDetail}
              scroll={scroll}
              aria-labelledby='scroll-dialog-title'
              aria-describedby='scroll-dialog-description'>
              <DialogTitle>Help</DialogTitle>
              <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                  id='scroll-dialog-description'
                  >
                      <div>
                        <strong>
                          {selected.title}
                          <br />
                        </strong>
                        <Divider />
                        {selected.text}
                        <br />
                        <br />
                      </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  onClick={handleCloseDetail}
                  className='btncl1'>
                  Close
                </button>
              </DialogActions>
            </Dialog>
    </div>
  );
}

export default withSidebarAndHeader(Profile); // Call the HOC once to wrap the Profile component
