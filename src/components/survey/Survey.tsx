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
  const onSubmit = async (e: any) => {
    // Create a new FormData object
    e.preventDefault();
    const formData = new FormData();

    // Append values from the form to the FormData object
    formData.append('surveyName', watch('surveyName'));
    formData.append('surveyDescription', watch('surveyDescription'));
    formData.append('totalReward', watch('totalReward'));
    formData.append('startDate', watch('startDate'));
    formData.append('endDate', watch('endDate'));

    // Append totalQues array to FormData
    formData.append('totalQues', JSON.stringify(watch('totalQues')));

    const storedData = localStorage.getItem('dframeClientData');
    const token = localStorage.getItem('tokenForClient');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const id = parsedData._id;

      // Append clientId and statusCampaign to FormData
      formData.append('clientId', id);
      formData.append('statusCampaign', 'active');

      console.log('formData:', formData);

      try {
        // Use axios to make the POST request with FormData
        const response = await axios.post(
          'https://localhost:5000/survey/addSurvey',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              clientid: id,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('Response from addSurvey:', response.data);
      } catch (error) {
        console.error('Error from addSurvey:', error);
      }
    }
  };

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
            onSubmit={onSubmit}
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
