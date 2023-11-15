/** @format */

'use client';
import React, { useContext, useEffect, useState } from 'react';
import withSidebarAndHeader from '../../components/hoc/higherOrderComponent';
import axios from 'axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { AppContext } from '@/context/context';
import Image from 'next/image';
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
  profileImage: string;
}

function Profile() {
  const [openImageToast, setOpenImageToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [edit, setEdit] = useState(false);
  const { setClientData, clientData } = useContext(AppContext);
  const [image, setImage] = useState('');
  const [data, setData] = useState<CompanyData>();
  const [copied, setCopied] = useState(false);

  const { handleSubmit, control } = useForm();
  const [showEditForm, setShowEditForm] = useState(false);

  const onSubmit = (formData: any) => {
    // Handle the form submission, formData will contain the updated values
    console.log(formData);
    // You can update the data in your state or perform other actions here
  };
  useEffect(() => {
    // Retrieve the data from localStorage
    const storedData = localStorage.getItem('dframeClientData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      setClientData(parsedData);
    }
  }, []);

  console.log(clientData);
  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setOpenImageToast(true);
    const file = event.target.files![0];
    // Read the file as a buffer
    // setFiles(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      // Create a new Blob object from the buffer
      const blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);

      // Create a new FormData object and append the blob to it
      const formData = new FormData();
      formData.append('image', file);

      // Send the image to the backend using Axios
      const id = localStorage.getItem('clientId');
      console.log('id', id);
      await axios
        .patch(
          `https://client-backend-402017.el.r.appspot.com/users/image/${id}`,
          formData
        )
        .then((response) => {
          console.log('image called');
          console.log(response.data.imageUrl);
          const _imageUrl = response.data.imageUrl;
          // setImageUrl(_imageUrl);
          setImage(response.data.imageUrl);
          localStorage.setItem('imageUrl', response.data.imageUrl);
          console.log(image);
        })
        .catch((error) => {
          console.log('image error');
          console.error(error);
        });
    };
  };

  function copyAddress() {
    const tempInput = document.createElement('input');
    tempInput.value = data?.walletAddress || 'nothing to copy';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0];
    // You can now handle the selected file (e.g., upload it or set it as a profile image)
    const storedData = localStorage.getItem('dframeClientData');

    const parsedData = JSON.parse(storedData as any);
    setData(parsedData);
    const id = parsedData._id;
    const formData = new FormData();
    formData.append('image', selectedFile);
    await fetch(`http://localhost:5000/users/image/${id}`, {
      method: 'PATCH',

      body: formData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert('ERROR');
        console.log(error);
      });
  };
  return (
    <div>
      <div className='m-6 bg-[#DDE2EA] rounded-lg py-4 px-6 '>
        <p className='text-[28px]'>Profile</p>

        <div className='mt-4 bg-white rounded-lg p-6 flex mb-8 min-h-[70vh]'>
          <div className='w-[25%]'>
            <div className='w-[160px] h-[160px] rounded-full mx-auto'>
              {!showEditForm ? (
                <Image
                  src={data?.profileImage ? data.profileImage : ''}
                  width={160}
                  height={160}
                  alt='Profile'
                  className='rounded-full w-[160px] h-[160px] border-4 border-blue-300'
                />
              ) : (
                <div className='relative'>
                  <div className='relative'>
                    {/* Display the selected image */}
                    <img
                      src={data?.profileImage}
                      width={160}
                      height={160}
                      alt='Selected Image'
                      className='rounded-full border border-blue-300 w-[160px] h-[160px]'
                    />

                    {/* Pencil edit icon */}
                    <div className='absolute top-0 right-0 p-2 cursor-pointer'>
                      <EditIcon />
                    </div>
                  </div>

                  {/* Input for selecting a new image */}
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='hidden'
                    id='imageInput' // Add an id for the label to refer to
                  />

                  {/* Label to trigger the file input */}
                  <label
                    htmlFor='imageInput'
                    className='absolute top-0 right-0 p-2 cursor-pointer'>
                    <EditIcon />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className='w-[75%]'>
            {data ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='text-[18px]'>
                  <div className='my-8 w-[100%] flex'>
                    <p className='w-[30%] my-auto'>Comapny Name</p>
                    <p className='w-[2%] my-auto'>:</p>
                    {!showEditForm ? (
                      <p className='my-auto'>{data.companyName}</p>
                    ) : (
                      <Controller
                        name='companyName'
                        control={control}
                        defaultValue={data.companyName}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Company Name'
                            size='small'
                            className='w-[60%]'
                          />
                        )}
                      />
                    )}
                  </div>
                  <div className='my-8 w-[100%] flex'>
                    <p className='w-[30%] my-auto'>Comapny Email</p>
                    <p className='w-[2%] my-auto'>:</p>
                    {!showEditForm ? (
                      <p className='my-auto'>{data.companyEmail}</p>
                    ) : (
                      <Controller
                        name='companyEmail'
                        control={control}
                        defaultValue={data.companyEmail}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Company Email'
                            size='small'
                            className='w-[60%]'
                          />
                        )}
                      />
                    )}
                  </div>
                  <div className='my-8 w-[100%] flex'>
                    <p className='w-[30%]'>Comapny Type</p>
                    <p className='w-[2%]'>:</p>
                    {!showEditForm ? (
                      <p className='my-auto'>{data.companyType}</p>
                    ) : (
                      <Controller
                        name='companyType'
                        control={control}
                        defaultValue={data.companyType}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Company Type'
                            size='small'
                            className='w-[60%]'
                          />
                        )}
                      />
                    )}
                  </div>
                  <div className='my-8 w-[100%] flex'>
                    <p className='w-[30%]'>Comapny Address1</p>
                    <p className='w-[2%]'>:</p>
                    {!showEditForm ? (
                      <p className='my-auto'>{data.companyAddress1}</p>
                    ) : (
                      <Controller
                        name='companyAddress1'
                        control={control}
                        defaultValue={data.companyAddress1}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Company Address1'
                            size='small'
                            className='w-[60%]'
                          />
                        )}
                      />
                    )}
                  </div>
                  <div className='my-8 w-[100%] flex'>
                    <p className='w-[30%]'>Comapny Address2</p>
                    <p className='w-[2%]'>:</p>
                    {!showEditForm ? (
                      <p className='my-auto'>{data.companyAddress2}</p>
                    ) : (
                      <Controller
                        name='companyAddress2'
                        control={control}
                        defaultValue={data.companyAddress2}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Company Address2'
                            size='small'
                            className='w-[60%]'
                          />
                        )}
                      />
                    )}
                  </div>

                  <div className='my-8 w-[100%] flex'>
                    <p className='w-[30%]'>Wallet Address</p>
                    <p className='w-[2%]'>:</p>
                    <p>
                      {data.walletAddress.slice(0, 8)}.........
                      {data.walletAddress.slice(-8, -1)}
                    </p>
                    <ContentCopyIcon
                      className={`${
                        copied
                          ? 'text-green-500'
                          : 'text-blue-500 hover:text-blue-700'
                      } ml-4`}
                      onClick={copyAddress}
                    />
                  </div>

                  {showEditForm ? (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => setShowEditForm(false)}>
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => setShowEditForm(true)}
                      type='submit'>
                      Edit
                    </Button>
                  )}
                </div>
              </form>
            ) : (
              <div>
                <p>No data to display</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withSidebarAndHeader(Profile); // Call the HOC once to wrap the Profile component
