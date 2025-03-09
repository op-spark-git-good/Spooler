import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const NotionsForm = () => {
  const { state } = useLocation();  // Get the state passed from the previous component
  const navigate = useNavigate();   // Hook to programmatically navigate
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Local state to track the form data
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    color: '',
    brand: '',
    upc: '',
    colorNumber: '',
    quantity: '',
    length: '',
  });

  // Autofill the form when the state is available
  useEffect(() => {
    if (state) {
      // Populate form data using setValue
      setFormData({
        title: state.title || '',
        image: state.image || '',
        color: state.color || '',
        brand: state.brand || '',
        upc: state.upc || '',
        id: state.info.item._id,
        colorNumber: state.colorNumber || '',
        quantity: state.quantity || '',
        length: state.length || '',
      });

      // Set values in react-hook-form
      setValue('title', state.title || '');
      setValue('image', state.image || '');
      setValue('color', state.color || '');
      setValue('brand', state.brand || '');
      setValue('upc', state.upc || '');
      setValue('_id', state.info.item._id || '');
      setValue('colorNumber', state.colorNumber || '');
      setValue('quantity', state.quantity || '');
      setValue('length', state.length || '');
    }
  }, [state, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    // Construct the data to match the structure expected by the API
    const updatedData = {
      item: {
        title: data.title || formData.title,
        image: data.image,
        color: data.color || formData.color,
        brand: data.brand || formData.brand,
        upc: data.upc || formData.upc,
        colorNum: formData.colorNumber,
        quantity: formData.quantity,
        length: formData.length,
      }
    };

    console.log('Data to be sent to the Database:', updatedData); // Log to check the structure of the payload

    // Sending a PUT request to update the notion data.
    axios.put(`/api/notions/${formData.id}`, updatedData)
      .then(response => {

        if (response.status === 200) {
          navigate('/notions');
        } else {
          throw new Error('Failed to update');
        }
      })
      .catch(error => {
        console.error('Error updating data:', error);
        alert('Failed to update the item!');
      });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>

        <label>Title</label>
        <input
          type='text'
          {...register('title', { required: 'Title is required' })}
          value={formData.title}
          onChange={handleInputChange}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <div>
        <label>Brand</label>
        <input
          type='text'
          {...register('brand', { required: 'Brand is required' })}
          value={formData.brand}
          onChange={handleInputChange}
        />
        {errors.brand && <span>{errors.brand.message}</span>}
      </div>

      <div>
        <label>Color</label>
        <input
          type='text'
          {...register('color', { required: 'Color is required' })}
          value={formData.color}
          onChange={handleInputChange}
        />
        {errors.color && <span>{errors.color.message}</span>}
      </div>

      <div>
        <label>Color Number</label>
        <input
          type='number'
          {...register('colorNumber')}
          value={formData.colorNumber}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>UPC Number</label>
        <input
          type='text'
          {...register('upc', { required: 'UPC Number is required' })}
          value={formData.upc}
          onChange={handleInputChange}
        />
        {errors.upc && <span>{errors.upc.message}</span>}
      </div>

      <div>
        <label>Quantity</label>
        <input
          type='number'
          {...register('quantity', { required: 'Quantity is required' })}
          value={formData.quantity}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Length in yards</label>
        <input
          type='number'
          {...register('length')}
          value={formData.length}
          onChange={handleInputChange}
        />
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default NotionsForm;