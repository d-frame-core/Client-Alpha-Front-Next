/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import axios from 'axios';
import {
  Alert,
  Button,
  FormControlLabel,
  Snackbar,
  Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CreateSurveyPopup from '@/components/survey/Survey';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [data, setData] = useState<CompanyData>();
  const [allAdsDetails, setAllAdsDetails] = useState<any>([]);
  const [singleDetails, setSingleDetails] = useState<any>({});
  const [open, setOpen] = React.useState(false);
  const [surveyActiveToastOpen, setSurveyActiveToastOpen] = useState(false);
  const [surveyInactiveToastOpen, setSurveyInactiveToastOpen] = useState(false);
  const [surveyDeletedToaster, setSurveyDeletedToaster] = useState(false);

  const handleClickOpen = (index: any) => {
    setSingleDetails(allAdsDetails[index]);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const onSubmit = (formData: any) => {
    console.log(formData);
  };
  useEffect(() => {
    // Retrieve the data from localStorage
    getAllCampaigns();
  }, []);

  async function getAllCampaigns() {
    const storedData =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('dframeClientData');
    const token =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('tokenForClient');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      const id = parsedData._id;
      await axios
        .get(
          `https://client-backend-402017.el.r.appspot.com/survey/client/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              clientid: id,
            },
          }
        )
        .then((res) => {
          console.log('All Survey Details', res.data);
          setAllAdsDetails(res.data);
          setSingleDetails(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async function setSurveyInactive(id: any) {
    // .stopPropagation();
    setSurveyInactiveToastOpen(true);
    console.log('setSurveyInactive', id);
    await axios
      .put(
        `https://client-backend-402017.el.r.appspot.com/survey/${id}/status`,
        {
          isActive: false,
        }
      )
      .then((res) => {
        getAllCampaigns();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function to set survey active
  async function setSurveyActive(id: any) {
    setSurveyActiveToastOpen(true);
    await axios
      .put(
        `https://client-backend-402017.el.r.appspot.com/survey/${id}/status`,
        {
          isActive: true,
        }
      )
      .then((res) => {
        getAllCampaigns();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteParticularSurvey(surveyId: any) {
    const token =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('tokenForClient');
    setSurveyDeletedToaster(true);
    const res = await axios.delete(
      `https://client-backend-402017.el.r.appspot.com/survey/deleteSurvey/${surveyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('delete');
    setOpen(false);
    getAllCampaigns();
  }

  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSurveyInactiveToastOpen(false);
    setSurveyActiveToastOpen(false);
    setSurveyDeletedToaster(false);
  };

  return (
    <div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 h-[90vh] overflow-y-auto '>
        <div className='flex justify-between'>
          <p className='text-[28px]'>Surveys</p>
          <CreateSurveyPopup />
        </div>
        <div className='mt-4 bg-white flex rounded-lg mb-4 min-h-[69vh] h-[69vh] overflow-auto '>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              aria-label='customized table'>
              <TableHead>
                <TableRow className='bg-red-300'>
                  <StyledTableCell
                    className='border-2 border-blue-600 text-center'
                    align='center'>
                    Survey Name
                  </StyledTableCell>
                  <StyledTableCell
                    className='border-2 border-blue-600 text-center'
                    align='center'>
                    Status
                  </StyledTableCell>
                  <StyledTableCell
                    className='border-2 border-blue-600 text-center'
                    align='center'>
                    View
                  </StyledTableCell>

                  <StyledTableCell
                    className='border-2 border-blue-600 text-center'
                    align='center'>
                    totalReward
                  </StyledTableCell>
                  <StyledTableCell
                    className='border-2 border-blue-600 text-center'
                    align='center'>
                    Start Date
                  </StyledTableCell>
                  <StyledTableCell
                    className='border-2 border-blue-600 text-center'
                    align='center'>
                    End Date
                  </StyledTableCell>
                  <StyledTableCell
                    className='border-2 border-blue-600 text-center'
                    align='center'>
                    Delete
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAdsDetails.map((row: any, index: number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      component='th'
                      align='center'
                      scope='row'>
                      {row.surveyName}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.statusCampaign}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='cursor-pointer'
                      onClick={() => handleClickOpen(index)}>
                      <VisibilityIcon />
                    </StyledTableCell>
                    {/* <StyledTableCell align='center'>
                      <div
                        className='statusCampaignDetails'
                        onClick={(e) => e.stopPropagation()}>
                        {row.statusCampaign === 'active' ? (
                          <FormControlLabel
                            label=''
                            className='themeSwitch'
                            onClick={(event) => setSurveyInactive(row._id)}
                            control={<Switch defaultChecked />}
                          />
                        ) : (
                          <FormControlLabel
                            label=''
                            className='themeSwitch'
                            onClick={() => setSurveyActive(row._id)}
                            control={<Switch />}
                          />
                        )}
                      </div>
                    </StyledTableCell> */}
                    <StyledTableCell align='center'>
                      {row.totalReward}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.startDate}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.endDate}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='cursor-pointer'
                      onClick={() => deleteParticularSurvey(row._id)}>
                      <DeleteIcon className='text-red-500' />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle className='text-[28px]'>Survey Detail</DialogTitle>
        <DialogContent>
          <p className='text-center text-[28px]'>{singleDetails?.surveyName}</p>
          <p className='text-center text-[20px] text-gray-800'>
            {singleDetails?.surveyDescription}
          </p>
          <div className='mt-4 m-auto w-[500px] text-[20px]'>
            <p className='w-[100%] my-2'>
              <span className='text-gray-700 font-semibold mr-4'>
                Survey Status
              </span>
              : {singleDetails?.statusCampaign}
            </p>
            <p className='w-[100%] my-2'>
              <span className='text-gray-700 font-semibold mr-4'>
                Start Date
              </span>
              : {singleDetails?.startDate}
            </p>
            <p className='w-[100%] my-2'>
              <span className='text-gray-700 font-semibold mr-4'>End Date</span>
              : {singleDetails?.endDate}
            </p>
          </div>
          <div>
            {singleDetails?.totalQues?.map(
              (singleQuestion: any, index: number) => (
                <div
                  key={index}
                  className='bg-blue-300 rounded-lg mt-4'>
                  <p className='bg-blue-500 text-center py-2 rounded-t-lg'>
                    Question : {singleQuestion?.title}
                  </p>
                  <div className='flex justify-around py-2'>
                    <p>Option 1 : {singleQuestion?.options[0]}</p>
                    <p>Option 2 : {singleQuestion?.options[1]}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {surveyInactiveToastOpen && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={surveyInactiveToastOpen}
          autoHideDuration={6000}
          onClose={() => {
            setSurveyInactiveToastOpen(false);
          }}>
          <Alert
            onClose={handleToastClose}
            severity='info'
            sx={{ width: '20vw', height: '5vh', fontSize: '1rem' }}>
            Survey is Inactive now
          </Alert>
        </Snackbar>
      )}
      {surveyActiveToastOpen && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={surveyActiveToastOpen}
          autoHideDuration={6000}
          onClose={() => {
            setSurveyActiveToastOpen(false);
          }}>
          <Alert
            onClose={handleToastClose}
            severity='info'
            sx={{ width: '20vw', height: '5vh', fontSize: '1rem' }}>
            Survey is Active now
          </Alert>
        </Snackbar>
      )}
      {surveyDeletedToaster && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={surveyDeletedToaster}
          autoHideDuration={6000}
          onClose={() => {
            setSurveyDeletedToaster(false);
          }}>
          <Alert
            onClose={handleToastClose}
            severity='error'
            sx={{ width: '20vw', height: '5vh', fontSize: '1rem' }}>
            Survey Deleted
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default withSidebarAndHeader(Profile); // Call the HOC once to wrap the Profile component
