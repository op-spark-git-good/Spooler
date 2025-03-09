import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Container, Paper, Box, Typography, TextField, Button } from '@mui/material';

const NotionsForm = ({ initialData }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const stashNotion = state || initialData || {};

  const [formData, setFormData] = useState({
    title: '',
    color: '',
    brand: '',
    upc: '',
    colorNum: '',
    quantity: '',
    length: '',
    image: '',
  });

  useEffect(() => {
    if (stashNotion) {
      const newStashNotion = {
        title: stashNotion.title || '',
        color: stashNotion.color || '',
        brand: stashNotion.brand || '',
        upc: stashNotion.upc || '',
        id: stashNotion._id,
        colorNum: stashNotion.colorNum || '',
        quantity: stashNotion.quantity || '',
        length: stashNotion.length || '',
        image: stashNotion.image || '',
      };

      setFormData(newStashNotion);

      Object.keys(newStashNotion).forEach(key => {
        setValue(key, newStashNotion[key]);
      });
    }
  }, [stashNotion, setValue]);

  const onSubmit = (notion) => {
    const updatedData = {
      item: {
        title: notion.title || formData.title,
        color: notion.color || formData.color,
        brand: notion.brand || formData.brand,
        upc: notion.upc || formData.upc,
        colorNum: notion.colorNum || formData.colorNum,
        quantity: notion.quantity || formData.quantity,
        length: notion.length || formData.length,
        image: notion.image
      }
    };

    axios.put(`/api/notions/${stashNotion.id || state.info.item._id}`, updatedData)
      .then(response => {
        if (response.status === 200) {
          navigate('/notions');
        } else {
          throw new Error('Update failed');
        }
      })
      .catch(error => {
        console.error('Error updating data:', error);
        alert('Update failed!');
      });
  };

  return (
    <Container maxWidth="sm">
      {/* Page Title */}
      <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Notion
        </Typography>
      </Box>

      {/* Paper Wrapper for Form */}
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 2, backgroundColor: '#fff' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              {...register('title', { required: 'Title is required' })}
              defaultValue={formData.title}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />

            <TextField
              label="Brand"
              {...register('brand', { required: 'Brand is required' })}
              defaultValue={formData.brand}
              error={!!errors.brand}
              helperText={errors.brand?.message}
              fullWidth
            />

            <TextField
              label="Color"
              {...register('color', { required: 'Color is required' })}
              defaultValue={formData.color}
              error={!!errors.color}
              helperText={errors.color?.message}
              fullWidth
            />

            <TextField
              label="Color Number"
              type="number"
              {...register('colorNum')}
              defaultValue={formData.colorNum}
              fullWidth
            />

            <TextField
              label="UPC Number"
              {...register('upc', { required: 'UPC Number is required' })}
              defaultValue={formData.upc}
              error={!!errors.upc}
              helperText={errors.upc?.message}
              fullWidth
            />

            <TextField
              label="Quantity"
              type="number"
              required
              id='required'
              {...register('quantity', { required: 'Quantity is required' })}
              defaultValue={formData.quantity}
              fullWidth
            />

            <TextField
              label="Length (yards)"
              type="number"
              min='0'
              {...register('length')}
              defaultValue={formData.length}
              fullWidth
            />

            {/* Display Current Image */}
            {formData.image && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="subtitle1">Current Image</Typography>
                <img
                  src={formData.image}
                  alt="Notion Item"
                  style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                />
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3, backgroundColor: 'rgb(31, 101, 66)',
                color: 'rgb(229, 229, 234)'
              }}
            >
              Spool On
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default NotionsForm;