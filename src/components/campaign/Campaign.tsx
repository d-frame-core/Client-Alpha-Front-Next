/** @format */

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const CreateSurveyPopup = () => {
  const [campaignName, setCampaignName] = useState<string>('');
  const [adImage, setAdImage] = useState<any>('');
  const [campaignType, setCampaignType] = useState<string>('Awareness');
  const [adName, setAdName] = useState<string>('');
  const [adFile, setAdFile] = useState<string | Blob>('');
  // const [adVideo, setAdVideo] = useState<string>("");
  const [adContent, setAdContent] = useState<string>('');
  const [adLink, setAdLink] = useState<string>('');
  const [adTags, setAdTags] = useState<any>([]);
  const [adLocation, setAdLocation] = useState<string>('');
  const [adStartDate, setAdStartDate] = useState('');
  const [adEndDate, setAdEndDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [perDayBudget, setPerDayBudget] = useState<any>();
  const [totalDaysToRun, setTotalDaysToRun] = useState<any>();
  const [tagsExist, setTagsExist] = useState(false);
  const [bidAmountError, setBidAmountError] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [startDateDisplay, setStartDateDisplay] = useState<any>();
  const [endDateDisplay, setEndDateDisplay] = useState<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [open, setOpen] = React.useState(false);
  const [adType, setadType] = React.useState('image');
  const [next, setNext] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [step, setStep] = React.useState(1);

  function handleStepUp() {
    setStep(2);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (data: any) => {
    console.log('data for campaign', data);
    const storedData = localStorage.getItem('dframeClientData');
    const token = localStorage.getItem('tokenForClient');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const id = parsedData._id;
    }
    // window.location.reload();
  };
  const removeTag = (indexToRemove: number) => {
    setAdTags(adTags.filter((_: any, index: any) => index !== indexToRemove));
  };
  const handleStartDateChange = (event: any) => {
    setStartDateDisplay(event.target.value);
    const selectedDate = new Date(event.target.value);
    const formattedDate = selectedDate.toLocaleDateString('en-GB');
    setAdStartDate(formattedDate);
    const currentDate = new Date().toLocaleDateString('en-GB');
    if (formattedDate < currentDate) {
      setAdStartDate('');
      setAdEndDate('');
      setStartDateDisplay('');
      setDateError('Start Date should be greater than the current date');
    } else {
      setDateError('');
    }
  };

  //  function to handle the end date change
  const handleEndDateChange = (event: any) => {
    setEndDateDisplay(event.target.value);
    const selectedDate = new Date(event.target.value);
    const formattedDate = selectedDate.toLocaleDateString('en-GB');
    setAdEndDate(formattedDate);
    if (formattedDate <= adStartDate) {
      setAdEndDate('');
      setEndDateDisplay('');
      setDateError('End Date should be greater than the Start Date');
    } else {
      setDateError('');
    }
  };
  const handleBidAmount = (event: any) => {
    const amount = event.target.value;
    setBidAmount(amount);

    if (amount < 1 || amount > 100) {
      setBidAmountError('**Bid Amount should be between 1 and 100');
    } else {
      setBidAmountError('');
    }
  };

  async function createNewCampaign() {
    setOpen(false);
    const storedData = localStorage.getItem('dframeClientData');
    const parsedData = JSON.parse(storedData as any);

    const id = parsedData._id;
    const formData = new FormData();
    formData.append('clientId', id);
    formData.append('campaignName', campaignName);
    formData.append('campaignType', campaignType);
    formData.append('adName', adName);
    formData.append('adType', adType);
    formData.append('startDate', adStartDate);
    formData.append('endDate', adEndDate);
    formData.append('adUrl', adLink);
    formData.append('adContent', adContent);
    formData.append('tags', JSON.stringify(adTags));
    formData.append('image', adImage);
    formData.append('bidAmount', bidAmount); // Append the image file
    formData.append('totalDays', totalDaysToRun); // Append the image file
    formData.append('perDay', perDayBudget); // Append the image file

    await fetch(
      `https://client-backend-402017.el.r.appspot.com/ads/test/createAd`,
      {
        method: 'POST',

        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          setOpen(false);

          window.location.reload();
        }, 1000);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <Button
        variant='contained'
        className='mr-8 text-[24px]'
        onClick={handleClickOpen}>
        <AddIcon className='mr-2' /> Create Ad
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle>Create Survey</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4 min-w-[500px] py-2'>
            {step == 1 && (
              <>
                <Controller
                  name='campaignName'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Campaign name is required' }}
                  render={({ field }) => (
                    <TextField
                      label='Campaign Name (in 30 char)'
                      variant='standard'
                      {...field}
                      fullWidth
                      inputProps={{
                        maxLength: 30,
                      }}
                      onChange={(e) => setCampaignName(e.target.value)}
                      value={campaignName}
                    />
                  )}
                />
                <Controller
                  name='campaignType'
                  control={control}
                  defaultValue='Awareness'
                  render={({ field }) => (
                    <TextField
                      label='Campaign Type'
                      select
                      SelectProps={{
                        native: true,
                      }}
                      helperText='Please select the Tags'
                      variant='standard'
                      {...field}
                      onChange={(e) => setCampaignType(e.target.value)}
                      value={campaignType}>
                      <option value='awareness'>Awareness</option>
                      <option value='marketing'>Marketing</option>
                    </TextField>
                  )}
                />
                <Controller
                  name='adName'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Ad Name is required',
                    validate: {
                      validateAdName: (value) => value.trim() !== '',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label='Ad Name (in 30 char)'
                      variant='standard'
                      {...field}
                      fullWidth
                      inputProps={{
                        maxLength: 30,
                      }}
                      onChange={(e) => setAdName(e.target.value)}
                      value={adName}
                    />
                  )}
                />
                <Controller
                  name='adType'
                  control={control}
                  defaultValue='Image'
                  render={({ field }) => (
                    <TextField
                      select
                      label='Ad Type'
                      SelectProps={{
                        native: true,
                      }}
                      variant='standard'
                      {...field}
                      onChange={(e) => setadType(e.target.value)}
                      value={adType}>
                      <option>...</option>
                      <option value='image'>Image</option>
                      <option value='video'>Video</option>
                    </TextField>
                  )}
                />
                {adType === 'image' && (
                  <div className='addImage'>
                    <label
                      style={{
                        cursor: 'pointer',
                      }}
                      htmlFor='files'>
                      Add Image
                    </label>
                    <Controller
                      name='adImage'
                      control={control}
                      render={({ field }) => (
                        <input
                          type='file'
                          id='imageUpload'
                          accept='image/*'
                          onChange={(e) => setAdImage(e.target.files![0])}
                        />
                      )}
                    />
                  </div>
                )}
                {adType === 'video' && (
                  <div className='addImage'>
                    <label
                      style={{
                        cursor: 'pointer',
                      }}
                      htmlFor='videoUpload'>
                      Add Video
                    </label>
                    <Controller
                      name='adImage'
                      control={control}
                      render={({ field }) => (
                        <input
                          type='file'
                          id='videoUpload'
                          accept='video/*'
                          onChange={(e) => setAdImage(e.target.files![0])}
                        />
                      )}
                    />
                  </div>
                )}
                <Controller
                  name='adLink'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      label='Ad Website'
                      variant='standard'
                      {...field}
                      fullWidth
                      onChange={(e) => setAdLink(e.target.value)}
                      value={adLink}
                    />
                  )}
                />
                <Controller
                  name='adContent'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Ad Description is required',
                    validate: {
                      validateAdContent: (value) => value.trim() !== '',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label='Ad Description'
                      variant='standard'
                      {...field}
                      fullWidth
                      onChange={(e) => setAdContent(e.target.value)}
                      value={adContent}
                    />
                  )}
                />
              </>
            )}
            {step == 2 && (
              <div className='campaignsFormBody'>
                <div className={`flex gap-3 flex-wrap w-11/12 mx-auto`}>
                  {adTags.map((tag: any, index: any) => (
                    <div
                      key={index}
                      className='tagAddedDiv'>
                      <span>{tag}</span>
                      <button onClick={() => removeTag(index)}>&#10006;</button>
                    </div>
                  ))}
                </div>

                <TextField
                  id='standard-basic'
                  label='Ad Tags'
                  variant='standard'
                  sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const tagText = inputValue.trim();
                      if (tagText) {
                        setAdTags([...adTags, tagText]);
                        setInputValue('');
                        setTagsExist(true);
                      }
                      e.preventDefault();
                    }
                    if (e.key === 'Backspace' && inputValue === '') {
                      setAdTags(adTags.slice(0, adTags.length - 1));
                    }
                  }}
                  required
                />

                <TextField
                  id='standard-basic'
                  label='Location (Will Implement In Future Release)'
                  variant='standard'
                  sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                  required
                  onChange={(e) => setAdLocation(e.target.value)}
                />
                <TextField
                  id='start-date'
                  variant='standard'
                  label='Start Date'
                  placeholder='Start Date'
                  type='date'
                  sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                  value={startDateDisplay}
                  onChange={handleStartDateChange}
                  required
                />
                <TextField
                  id='end-date'
                  label='End Date'
                  variant='standard'
                  type='date'
                  sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                  value={endDateDisplay}
                  onChange={handleEndDateChange}
                  required
                />
                {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
                <Divider />

                <TextField
                  id='standard-basic'
                  label='Bid Amount per user (DFT)'
                  variant='standard'
                  sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                  value={bidAmount}
                  onChange={handleBidAmount}
                  required
                />
                {bidAmountError && (
                  <p
                    style={{
                      color: 'red',
                      fontWeight: '600',
                      fontSize: '100%',
                      padding: 0,
                      margin: 0,
                    }}>
                    {bidAmountError}
                  </p>
                )}
                {/* Rest of your code */}

                <TextField
                  id='standard-basic'
                  label='Budget Amount Per Day (DFT)'
                  variant='standard'
                  sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                  onChange={(e) => setPerDayBudget(e.target.value)}
                  required
                />
                <TextField
                  id='standard-basic'
                  label='Total Days of Campaign'
                  variant='standard'
                  sx={{ left: '2vw', width: '90%', marginTop: '1.5vh' }}
                  onChange={(e) => setTotalDaysToRun(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              {step == 1 && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleStepUp}>
                  Next
                </Button>
              )}
            </div>
            {step == 2 && (
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={createNewCampaign}>
                Create
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateSurveyPopup;
