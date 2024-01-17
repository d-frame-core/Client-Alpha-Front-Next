/** @format */

import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Web3 from 'web3';

import { dframeAddress, dframeABI } from '@/utils/Utils';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { AppContext } from '@/context/context';

const CreateSurveyPopup = () => {
  const { clientData, setClientData } = React.useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'totalQues',
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    // Retrieve the data from localStorage
    const storedData =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('dframeClientData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setClientData(parsedData);
    }
  }, []);
  const onSubmit = async (formData: any) => {
    try {
      const storedData =
        typeof window !== 'undefined' &&
        window.localStorage.getItem('dframeClientData');
      const token =
        typeof window !== 'undefined' &&
        window.localStorage.getItem('tokenForClient');
      const parsedData = JSON.parse(storedData as any);
      const clientId = parsedData._id;
      const formattedStartDate = new Date(
        formData.startDate
      ).toLocaleDateString('en-GB');
      const formattedEndDate = new Date(formData.endDate).toLocaleDateString(
        'en-GB'
      );

      // Update the formData with formatted dates
      formData.startDate = formattedStartDate;
      formData.endDate = formattedEndDate;
      const requestData = {
        clientId,
        surveyName: formData.surveyName,
        surveyDescription: formData.surveyDescription,
        totalReward: formData.totalReward,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalQues: formData.totalQues.map((question: any, index: any) => ({
          questionNumber: index + 1,
          title: question.title,
          options: [question.options[0], question.options[1]],
          userAnswers: [],
        })),
        userAssigned: [],
        totalRes: 0,
        statusCampaign: 'UNVERIFIED',
      };

      if (
        formData.surveyName.length > 200 ||
        formData.surveyDescription.length > 200
      ) {
        alert(
          'Maximum 200 characters allowed for Survey Name and Survey Description'
        );
        return;
      }

      formData.totalQues.forEach((question: any, index: number) => {
        // Ensure the character limit for each question title does not exceed 200
        if (question.title.length > 200) {
          alert(
            `Maximum 200 characters allowed for Question ${index + 1} title`
          );
          return;
        }
        // Ensure the character limit for each option does not exceed 200
        question.options.forEach((option: string, optionIndex: number) => {
          if (option.length > 200) {
            alert(
              `Maximum 200 characters allowed for Option ${
                optionIndex + 1
              } in Question ${index + 1}`
            );
            return;
          }
        });
      });

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const web3 = new Web3(window.ethereum);
      // Create the contract instance
      const dframeContract = new web3.eth.Contract(dframeABI, dframeAddress);

      const id = parsedData._id;

      // Calculate the amount of tokens to transfer

      const amountToTransfer = Number(formData.totalReward);
      const amountInWei = web3.utils.toWei(
        amountToTransfer.toString(),
        'ether'
      ); // Convert to ether (1 ether = 10^18 wei)
      const tx = (dframeContract.methods as any)
        .transfer(
          '0xB77957A88Eaf89e1E2045c145A4488a2150f7eC5',
          amountInWei.toString()
        )
        .send({
          from: clientData?.walletAddress,
          gasPrice: web3.utils.toWei('1000', 'gwei'),
        });
      await tx;

      const response = await axios.post(
        'https://client-backend-402017.el.r.appspot.com/survey/addSurvey',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            clientid: clientId,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response from addSurvey:', response.data);

      // Close the dialog or handle success as needed

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error from addSurvey:', error);
    }
  };
  const storedData =
    typeof window !== 'undefined' &&
    window.localStorage.getItem('dframeClientData');
  const parsedData = JSON.parse(storedData as any);
  const id = parsedData._id;
  // console.log(id);
  return (
    <div>
      <Button
        variant='contained'
        className='mr-8 text-xl bg-blue-900'
        onClick={handleClickOpen}>
        <AddIcon className='mr-2' /> Create Survey
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle>Create Survey</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4 min-w-[500px] py-2'>
            <Controller
              name='surveyName'
              control={control}
              defaultValue=''
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextField
                  label='Title'
                  {...field}
                  fullWidth
                />
              )}
            />
            <Controller
              name='surveyDescription'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  label='Description'
                  {...field}
                  fullWidth
                  multiline
                />
              )}
            />
            <Controller
              name='totalReward'
              control={control}
              defaultValue=''
              rules={{
                required: 'Rewards is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Rewards must be a numeric value',
                },
              }}
              render={({ field }) => (
                <TextField
                  label='Rewards (numeric value)'
                  {...field}
                  error={!!errors.rewards}
                  fullWidth
                />
              )}
            />

            <Controller
              name='startDate'
              control={control}
              defaultValue=''
              rules={{ required: 'Start Date is required' }}
              render={({ field }) => (
                <TextField
                  label='Start Date'
                  type='date'
                  {...field}
                  error={!!errors.startDate}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            <Controller
              name='endDate'
              control={control}
              defaultValue=''
              rules={{ required: 'End Date is required' }}
              render={({ field }) => (
                <TextField
                  label='End Date'
                  type='date'
                  {...field}
                  error={!!errors.endDate}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <FormControl fullWidth>
              <p>Number of Questions</p>
              <Select
                value={fields.length}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  // Determine if you need to add or remove items from the array
                  if (Number(selectedValue) > fields.length) {
                    // Append additional items
                    for (
                      let i = fields.length;
                      i < Number(selectedValue);
                      i++
                    ) {
                      append({});
                    }
                  } else if (Number(selectedValue) < fields.length) {
                    // Remove extra items
                    for (
                      let i = fields.length - 1;
                      i >= Number(selectedValue);
                      i--
                    ) {
                      remove(i);
                    }
                  }
                }}>
                {[1, 2, 3, 4].map((num, index) => (
                  <MenuItem
                    key={index}
                    value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <List>
              {fields.map((question, index) => (
                <ListItem
                  key={question.id}
                  className='border-[1px] rounded border-gray-500 p-2 flex flex-col my-2'>
                  <ListItemText className='w-full'>
                    <Controller
                      name={`totalQues[${index}].title`}
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <TextField
                          label={`Question ${index + 1}`}
                          {...field}
                          fullWidth
                        />
                      )}
                    />
                  </ListItemText>
                  <div className='flex'>
                    <ListItemText>
                      <Controller
                        name={`totalQues[${index}].options[0]`}
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            label='Option 1'
                            {...field}
                            fullWidth
                          />
                        )}
                      />
                    </ListItemText>
                    <ListItemText>
                      <Controller
                        name={`totalQues[${index}].options[1]`}
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            label='Option 2'
                            {...field}
                            fullWidth
                          />
                        )}
                      />
                    </ListItemText>
                  </div>
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => remove(index)}
                    className='mt-2 w-full'>
                    Remove
                  </Button>
                </ListItem>
              ))}
            </List>

            <Button
              type='submit'
              variant='contained'
              className='bg-sky-600'
              color='primary'>
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateSurveyPopup;
