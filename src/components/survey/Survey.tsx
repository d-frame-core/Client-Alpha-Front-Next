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
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const CreateSurveyPopup = () => {
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

  const onSubmit = async (formData: any) => {
    try {
      const storedData = localStorage.getItem('dframeClientData');
      const token = localStorage.getItem('tokenForClient');
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
  const storedData = localStorage.getItem('dframeClientData');
  const parsedData = JSON.parse(storedData as any);
  const id = parsedData._id;
  // console.log(id);
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
