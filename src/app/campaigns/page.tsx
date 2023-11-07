"use client"
import React, { useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import axios from 'axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material'; 
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CreateCampaignForm from '@/components/campaign/Campaign';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#47B5FF',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Profile() {
  const [openToast, setOpenToast] = useState(false);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState('');
  const [data,setData]=useState<CompanyData>();
  const [allAdsDetails,setAllAdsDetails]= useState<any>([]);
  const [singleDetails,setSingleDetails]=useState<any>({});
  const [copied, setCopied] = useState(false);

  const { handleSubmit, control } = useForm();
  const [showEditForm, setShowEditForm] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (index:any) => {
    setSingleDetails(allAdsDetails[index]);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const onSubmit = (formData:any) => {
    console.log(formData);
  };
  useEffect(() => {
    // Retrieve the data from localStorage
    getAllCampaigns();
  }, []);

  async function getAllCampaigns() {
    const storedData = localStorage.getItem('dframeClientData');
    if (storedData) {  
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      const id = parsedData._id;
    await axios
      .get(`https://client-backend-402017.el.r.appspot.com/ads/clientAllAds/${id}`, {
        headers: {
          id: id,
        },
      })
      .then((res) => {
        console.log('All Ads Details', res.data);
        setAllAdsDetails(res.data);
        setSingleDetails(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }

  return (
    <div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 '>
        <div className='flex justify-between'>
          <p className='text-[28px]'>Campaigns</p>
          <CreateCampaignForm />
        </div>
        <div className='mt-4 bg-white flex rounded-lg mb-4 min-h-[70vh] overflow-auto '>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow className='bg-red-300'>
                  <StyledTableCell className='border-2 border-blue-600 text-center' align='center' >Ad Name</StyledTableCell>
                  <StyledTableCell className='border-2 border-blue-600 text-center' align='center'>Bid Amount</StyledTableCell>
                  <StyledTableCell className='border-2 border-blue-600 text-center' align='center'>Budget/Day</StyledTableCell>
                  <StyledTableCell className='border-2 border-blue-600 text-center' align='center'>View</StyledTableCell>
                  <StyledTableCell className='border-2 border-blue-600 text-center' align='center'>Type</StyledTableCell>
                  <StyledTableCell className='border-2 border-blue-600 text-center' align='center'>Daily User Assigned</StyledTableCell>
                  <StyledTableCell className='border-2 border-blue-600 text-center' align='center'>Start Date</StyledTableCell>
                  <StyledTableCell className='border-2 border-blue-600 text-center' align='center'>End Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                allAdsDetails.map((row:any,index:number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.adName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.bidAmount}</StyledTableCell>
                    <StyledTableCell align="right">{row.perDay}</StyledTableCell>
                    <StyledTableCell align="center" className='cursor-pointer' onClick={()=>handleClickOpen(index)}><VisibilityIcon /></StyledTableCell>
                    <StyledTableCell align="right">{row.campaignType}</StyledTableCell>
                    <StyledTableCell align="right">{row.perDay}</StyledTableCell>
                    <StyledTableCell align="right">{row.startDate}</StyledTableCell>
                    <StyledTableCell align="right">{row.endDate}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Campaign</DialogTitle>
        <DialogContent>
          <p className='text-center text-[28px]'>{singleDetails.campaignName}</p>
          <div className='mt-4 m-auto'>
              {singleDetails.adType == 'Image' ? (
                <img
                  src={
                    singleDetails.image
                      ? singleDetails.image.replace(/ /g, '%20')
                      : 'https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png.webp'
                  }
                  alt='errormage'
                  width={200}
                  style={{ marginTop: '20px' }}
                />
              ) : (
                <video
                  width={500} // Adjust the width as needed
                  height={415} // Adjust the height as needed
                  controls // Add controls for play, pause, etc.
                >
                  <source
                    src={
                      singleDetails.image
                        ? singleDetails.image
                        : 'https://www.youtube.com/embed/YKaj1HUcYt0?controls=1'
                    }
                    type='video/mp4'
                  />
                  Your browser does not support the video tag.
                </video>
              )}
          </div>
          <div className='mt-4 m-auto w-[500px] text-[20px]'>
            <p className='w-[100%] my-2'><span className='text-gray-700 font-semibold mr-4'>Ad Name</span>: {singleDetails.adName}</p>
            <p className='w-[100%] my-2'><span className='text-gray-700 font-semibold mr-4'>Ad Content</span>: {singleDetails.adContent}</p>
            <p className='w-[100%] my-2'><span className='text-gray-700 font-semibold mr-4'>Start Date</span>: {singleDetails.startDate}</p>
            <p className='w-[100%] my-2'><span className='text-gray-700 font-semibold mr-4'>Start Time</span>: {singleDetails.startTime}</p>
            <p className='w-[100%] my-2'><span className='text-gray-700 font-semibold mr-4'>End Date</span>: {singleDetails.endDate}</p>
            <p className='w-[100%] my-2'><span className='text-gray-700 font-semibold mr-4'>End Time</span>: {singleDetails.endTime}</p>
            <p className='w-[100%] my-2'><span className='text-gray-700 font-semibold mr-4'>Bid Amount</span>: {singleDetails.bidAmount}</p>
            <p className='w-[100%] my-2'><span className='text-gray-700 font-semibold mr-4'>Per Day</span>: {singleDetails.perDay}</p>
            <p className='w-[100%] my-2'><span className='text-gray-700 font-semibold mr-4'>Total Days</span>: {singleDetails.totalDays}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withSidebarAndHeader(Profile); // Call the HOC once to wrap the Profile component
