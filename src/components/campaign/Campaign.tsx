import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const CreateSurveyPopup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const [open, setOpen] = React.useState(false);
  const [adType, setadType] = React.useState('image');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [step, setStep] = React.useState(1);

  function handleStepUp(){
    setStep(2);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (data:any) => {
   console.log("data for campaign",data)
    const storedData = localStorage.getItem('dframeClientData');
    const token = localStorage.getItem('tokenForClient');
    if (storedData) {  
      const parsedData = JSON.parse(storedData);
      const id = parsedData._id;
    }
    // window.location.reload();
}

  return (
    <div>
    <Button variant="contained" className='mr-8 text-[24px]' onClick={handleClickOpen}><AddIcon className='mr-2'/> Create Ad</Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Survey</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 min-w-[500px] py-2'>
       {  step == 1 && (
        <> 
        <Controller
          name="campaignName"
          control={control}
          defaultValue=""
          rules={{ required: 'Campaign name is required' }}
          render={({ field }) => (
            <TextField
              label="Campaign Name (in 30 char)"
              variant='standard'
              {...field}
              fullWidth
              inputProps={{
                maxLength: 30,
              }}
            />
          )}
        />
        <Controller
          name="campaignType"
          control={control}
          defaultValue="Awareness"
          render={({ field }) => (
            <TextField
              label="Campaign Type"
              select
              SelectProps={{
                native: true,
              }}
              helperText='Please select the Tags'
              variant='standard'
              {...field}
            >
              <option value="awareness">
                  Awareness
                </option>
                <option value="marketing">
                  Marketing
                </option>
            </TextField>
          )}
        />
        <Controller
          name="adName"
          control={control}
          defaultValue=""
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
            />
          )}
        />
        <Controller
          name="adType"
          control={control}
          defaultValue="Image"
          render={({ field }) => (
            <TextField
              select
              label='Ad Type'
              SelectProps={{
                native: true,
              }}
              variant='standard'
              {...field}
            >
              <option >
                  ...
                </option>
             <option value="image">
                  Image
                </option>
                <option value="video">
                  Video
                </option>
            </TextField>
          )}
        />
        {watch('adType') === 'image' && (
          <div className='addImage'>
            <label
              style={{
                cursor: 'pointer',
              }}
              htmlFor='files'
            >
              Add Image
            </label>
            <Controller
            name="adImage"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            )}
          />
          </div>
        )}
        {watch('adType') === 'video' && (
          <div className="addImage">
          <label
            style={{
              cursor: 'pointer',
            }}
            htmlFor="videoUpload"
          >
            Add Video
          </label>
          <Controller
            name="adImage"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                id="videoUpload"
                accept="video/*"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            )}
          />
        </div>
        )}
        <Controller
          name="adLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label='Ad Website'
              variant='standard'
              {...field}
              fullWidth
            />
          )}
        />
        <Controller
          name="adContent"
          control={control}
          defaultValue=""
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
            />
          )}
        />
        </>)
      }
      {  step == 2 && (
        <> 
        <Controller
          name="campaignName"
          control={control}
          defaultValue=""
          rules={{ required: 'Campaign name is required' }}
          render={({ field }) => (
            <TextField
              label="Campaign Name (in 30 char)"
              variant='standard'
              {...field}
              fullWidth
              inputProps={{
                maxLength: 30,
              }}
            />
          )}
        />
        <Controller
          name="campaignType"
          control={control}
          defaultValue="Awareness"
          render={({ field }) => (
            <TextField
              label="Campaign Type"
              select
              SelectProps={{
                native: true,
              }}
              helperText='Please select the Tags'
              variant='standard'
              {...field}
            >
              <option value="awareness">
                  Awareness
                </option>
                <option value="marketing">
                  Marketing
                </option>
            </TextField>
          )}
        />
        <Controller
          name="adName"
          control={control}
          defaultValue=""
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
            />
          )}
        />
        <Controller
          name="adType"
          control={control}
          defaultValue="Image"
          render={({ field }) => (
            <TextField
              select
              label='Ad Type'
              SelectProps={{
                native: true,
              }}
              variant='standard'
              {...field}
            >
              <option >
                  ...
                </option>
             <option value="image">
                  Image
                </option>
                <option value="video">
                  Video
                </option>
            </TextField>
          )}
        />
        <Controller
          name="adLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label='Ad Website'
              variant='standard'
              {...field}
              fullWidth
            />
          )}
        />
        <Controller
          name="adContent"
          control={control}
          defaultValue=""
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
            />
          )}
        />
        </>)
      }
        <div>
          { step==1 &&
          <Button variant="contained" color="primary" >
          Next
        </Button>
        }
        </div>
            {
              step ==2 &&
              <Button type="submit" variant="contained" color="primary">
            Create
          </Button>}
          
        </form>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default CreateSurveyPopup;
